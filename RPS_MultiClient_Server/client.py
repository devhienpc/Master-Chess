import socket
import threading
import tkinter as tk
from tkinter import messagebox

HOST = '127.0.0.1'
PORT = 5555

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

player_name = ""
room_id = ""
can_play = False


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


def connect_server():
    global player_name, room_id

    player_name = name_entry.get().strip()
    room_id = room_entry.get().strip()

    if not player_name or not room_id:
        messagebox.showwarning("Thiếu thông tin", "Nhập tên và số phòng")
        return

    try:
        client.connect((HOST, PORT))
    except:
        messagebox.showerror("Lỗi", "Không kết nối được server")
        return

    threading.Thread(target=receive, daemon=True).start()

    connect_btn.config(state="disabled")
    name_entry.config(state="disabled")
    room_entry.config(state="disabled")


def choose(choice):
    global can_play
    if not can_play:
        return
    client.send((choice + "\n").encode())
    can_play = False
    enable_buttons(False)


def enable_buttons(state):
    for btn in buttons:
        btn.config(state=tk.NORMAL if state else tk.DISABLED)


root = tk.Tk()
root.title("Kéo - Búa - Bao Online")
root.geometry("520x560")

tk.Label(root, text="Tên người chơi").pack()
name_entry = tk.Entry(root)
name_entry.pack()

tk.Label(root, text="Số phòng").pack()
room_entry = tk.Entry(root)
room_entry.pack()

connect_btn = tk.Button(root, text="Kết nối server", command=connect_server)
connect_btn.pack(pady=8)

text_area = tk.Text(root, height=18, state="disabled")
text_area.pack(padx=10, pady=10)

btn_frame = tk.Frame(root)
btn_frame.pack(pady=10)

buttons = [
    tk.Button(btn_frame, text="✌ Kéo", width=10, command=lambda: choose("keo")),
    tk.Button(btn_frame, text="✊ Búa", width=10, command=lambda: choose("bua")),
    tk.Button(btn_frame, text="✋ Bao", width=10, command=lambda: choose("bao")),
]

for i, btn in enumerate(buttons):
    btn.grid(row=0, column=i, padx=5)
    btn.config(state=tk.DISABLED)

root.mainloop()
