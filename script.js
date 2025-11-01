 const COUNTDOWN_TIME = 5;
        const NAME = "Nguyễn Võ Chí Nguyện";

        const countdownEl = document.getElementById('countdown');
        const giftBoxEl = document.getElementById('gift-box');
        const cakeContainerEl = document.getElementById('cake-container');
        const bodyEl = document.body;
        const surpriseOverlayEl = document.getElementById('surprise-overlay');

        const synth = new Tone.Synth().toDestination();

        function startCountdown() {
            let count = COUNTDOWN_TIME;
            countdownEl.style.display = 'flex';
            
            const timer = setInterval(() => {
                countdownEl.textContent = count;
                countdownEl.classList.add('scale-125', 'opacity-50');
                
                setTimeout(() => {
                    countdownEl.classList.remove('scale-125', 'opacity-50');
                }, 100);

                if (count <= 0) {
                    clearInterval(timer);
                    countdownEl.style.display = 'none';
                    showGift();
                    return;
                }
                count--;
            }, 1000);
        }

        function showGift() {
            giftBoxEl.style.display = 'flex';
        }

        function handleGiftClick() {
            giftBoxEl.onclick = null;
            giftBoxEl.style.display = 'none';

            cakeContainerEl.style.display = 'flex';
            setTimeout(() => {
                cakeContainerEl.classList.remove('scale-0');
                cakeContainerEl.classList.add('scale-100');
            }, 50);

            setTimeout(triggerSurprise, 500);
        }

        function triggerSurprise() {
            bodyEl.classList.add('surprise-bg');

            playCelebrationSound();

            document.getElementById('surprise-message').classList.remove('opacity-0');

            for (let i = 0; i < 50; i++) {
                createConfetti();
            }
        }

        function playCelebrationSound() {
            const polySynth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "triangle" },
                envelope: {
                    attack: 0.01,
                    decay: 0.4,
                    sustain: 0.1,
                    release: 0.8
                }
            }).toDestination();

            const now = Tone.now();
            
            polySynth.triggerAttackRelease("G4", "8n", now);
            polySynth.triggerAttackRelease("G4", "8n", now + 0.25);
            polySynth.triggerAttackRelease("A4", "4n", now + 0.5);
            polySynth.triggerAttackRelease("G4", "4n", now + 1.0);
            polySynth.triggerAttackRelease("C5", "4n", now + 1.5);
            polySynth.triggerAttackRelease("B4", "4n", now + 2.0);
        }

        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const colors = ['#fde047', '#fb7185', '#34d399', '#6366f1', '#f97316'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = (Math.random() > 0.5 ? '50%' : '2px'); 

            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; 
            confetti.style.opacity = '1';
            
            surpriseOverlayEl.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
        
        window.onload = function() {
            console.log("Chúc Mừng Sinh Nhật Nguyễn Võ Chí Nguyện!");
            startCountdown();
        };

        //ước bạn ấy là của tôi