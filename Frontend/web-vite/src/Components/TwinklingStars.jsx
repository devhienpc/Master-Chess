import React, { useRef, useEffect } from 'react';

const TwinklingStars = ({ width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const stars = createStars(200, canvas.width, canvas.height);

        let animationFrameId;

        // Update the stars' properties
        const updateStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawStars(ctx, stars);
            stars.forEach(star => {
                star.twinkle();
                star.move();
            });
            animationFrameId = requestAnimationFrame(updateStars);
        };

        // Start the animation
        updateStars();

        // Clean up
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Create stars
    const createStars = (count, width, height) => {
        let stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(new Star(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 1 // Z-position ranging from 0 to 1
            ));
        }
        return stars;
    };

    // Draw stars
    const drawStars = (ctx, stars) => {
        stars.forEach(star => {
            const scaledRadius = star.radius * (1 - star.z); // Adjust radius based on Z-position
            const opacity = 1 - star.z; // Adjust opacity based on Z-position
            ctx.beginPath();
            ctx.arc(star.x, opacity * star.y, Math.random(), 0, Math.PI);
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`; // Adjust color based on Z-position
            ctx.fill();
        });
    };

    // Star class with movement, varying sizes, and Z-position
    class Star {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z; // Z-position
            this.radius = 0.5 * Math.random(); // Randomized radius for perspective
            this.opacity = 1 - this.x/width; // Initial opacity based on Z-position
            this.increment = Math.random() * 0.00002;
            this.xMovement = Math.random() > 0.00005 ? 0.5 : -0.005;
            this.yMovement = Math.random() > 0.5 ? 0.0005 : -0.5;
        }

        twinkle() {
            this.opacity += this.increment;
            if (this.opacity > 1 || this.opacity < 0) {
                this.increment = -this.increment;
            }
        }

        move() {
            // Move the star to give a sense of flying in random directions
            this.x += this.xMovement;
            this.y += this.yMovement;

            // Reset position if it moves out of view
            if (this.x > canvasRef.current.width || this.x < 0 || this.y > canvasRef.current.height || this.y < 0) {
                this.x = Math.random() * canvasRef.current.width;
                this.y = Math.random() * canvasRef.current.height;
                this.z = Math.random() * 1; // Reset Z-position
                this.xMovement = Math.random() > 0.5 ? 0.5 : -0.5;
                this.yMovement = Math.random() > 0.5 ? 0.5 : -0.5;
            }
        }
    }

    return <canvas ref={canvasRef} style={{
        width: '150vw',
        height: '150vh',
        top: '-25vh',
        left: '-25vw',
        position: 'fixed',
    }} />;
};

export default TwinklingStars;
