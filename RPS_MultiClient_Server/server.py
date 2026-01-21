import socket
import threading
import time

HOST = '127.0.0.1'
PORT = 5555

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen()

print(f"Server đang chạy tại {HOST}:{PORT}")

choices = ["keo", "bua", "bao"]

waiting_rooms = {}
rooms = {}
room_choices = {}
lock = threading.Lock()

def receive():
    global can_play
    while True:
        try:
            msg = client.recv(1024).decode()
            if not msg:
                break

            if "Nhập tên" in msg:
                client.send((player_name + "\n").encode())
                continue

            if "Nhập số phòng" in msg:
                client.send((room_id + "\n").encode())
                continue

            if msg.startswith("\n--- ROUND"):
                can_play = True
                enable_buttons(True)

            text_area.config(state="normal")
            text_area.insert(tk.END, msg)
            text_area.see(tk.END)
            text_area.config(state="disabled")

        except:
            break

def get_winner(p1, p2):
    if p1 == p2:
        return "draw"
    elif (p1 == "keo" and p2 == "bao") or \
         (p1 == "bua" and p2 == "keo") or \
         (p1 == "bao" and p2 == "bua"):
        return "p1"
    else:
        return "p2"


def listen_choice(player):
    while True:
        try:
            data = player.recv(1024).decode().strip().lower()
            if data in choices:
                with lock:
                    room_choices[player] = data
        except:
            break


def handle_client(client):
    try:
        client.send("Nhập tên:\n".encode())
        name = client.recv(1024).decode().strip()

        client.send("Nhập số phòng:\n".encode())
        room_id = client.recv(1024).decode().strip()
    except:
        client.close()
        return

    client.send(f"Đang vào phòng {room_id}...\n".encode())

    with lock:
        if room_id not in waiting_rooms:
            waiting_rooms[room_id] = (client, name)
            client.send("Đang chờ đối thủ...\n".encode())
        else:
            opponent, opponent_name = waiting_rooms.pop(room_id)
            rooms[client] = (opponent, opponent_name)
            rooms[opponent] = (client, name)

            room_choices[client] = None
            room_choices[opponent] = None

            client.send(f"Đã ghép với {opponent_name}\n".encode())
            opponent.send(f"Đã ghép với {name}\n".encode())

            threading.Thread(target=listen_choice, args=(client,), daemon=True).start()
            threading.Thread(target=listen_choice, args=(opponent,), daemon=True).start()

    while client not in rooms:
        time.sleep(0.1)

    opponent, opponent_name = rooms[client]

    score1 = 0
    score2 = 0
    round_count = 0

    try:
        while True:
            round_count += 1

            with lock:
                room_choices[client] = None
                room_choices[opponent] = None

            start_msg = f"\n--- ROUND {round_count} ---\nHÃY CHỌN: KÉO / BÚA / BAO\n"
            client.send(start_msg.encode())
            opponent.send(start_msg.encode())

            # Đợi cả 2 người Chọn
            while True:
                with lock:
                    if room_choices[client] and room_choices[opponent]:
                        break
                time.sleep(0.05)

            c1 = room_choices[client]
            c2 = room_choices[opponent]

            result = get_winner(c1, c2)

            if result == "p1":
                score1 += 1
            elif result == "p2":
                score2 += 1

            msg = "\n=== KẾT QUẢ ===\n"
            msg += f"{name}: {c1}\n"
            msg += f"{opponent_name}: {c2}\n"

            if result == "draw":
                msg += "→ HÒA\n"
            elif result == "p1":
                msg += f"→ {name} THẮNG\n"
            else:
                msg += f"→ {opponent_name} THẮNG\n"

            msg += f"📊 ĐIỂM: {name} {score1} - {score2} {opponent_name}\n"

            client.send(msg.encode())
            opponent.send(msg.encode())

            if round_count == 5:
                end_msg = "\n🏁 HẾT 5 ROUND!\n"
                if score1 > score2:
                    end_msg += f"🏆 {name} BẠN ĐÃ THẮNG CHUNG CUỘC\n"
                elif score2 > score1:
                    end_msg += f"🏆 {opponent_name} THẮNG CHUNG CUỘC\n"
                else:
                    end_msg += "🤝 BẠN ĐÃ HÒA CHUNG CUỘC\n"

                end_msg += "🔄 Reset điểm – chơi lại!\n"

                client.send(end_msg.encode())
                opponent.send(end_msg.encode())

                score1 = score2 = 0
                round_count = 0

    except:
        client.close()
        opponent.close()


def main():
    while True:
        client, addr = server.accept()
        print("Kết nối từ", addr)
        threading.Thread(target=handle_client, args=(client,), daemon=True).start()


if __name__ == "__main__":
    main()
