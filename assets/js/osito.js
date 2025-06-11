
    const bear = document.getElementById("bear");
    const letras = ["T", "E", " ", "A", "M", "O"];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Posiciones para cada letra (espaciadas)
    const spacing = 50;
    const baseX = centerX - spacing * 2;

    // Iniciar posición inicial del osito (fuera de pantalla)
    let bearStartX = -120;
    let bearY = centerY - 50;

    bear.style.left = `${bearStartX}px`;
    bear.style.top = `${bearY}px`;

    function moveTo(x, y) {
      return new Promise(resolve => {
        bear.style.transition = "all 1s ease-in-out";
        bear.style.left = `${x}px`;
        bear.style.top = `${y}px`;
        setTimeout(resolve, 1100);
      });
    }

    function leaveLetter(letterIndex) {
      return new Promise(resolve => {
        const letter = letras[letterIndex];
        if (letter === " ") {
          setTimeout(resolve, 800);
          return;
        }

        const targetX = baseX + letterIndex * spacing;
        const letterDiv = document.getElementById(letter);
        letterDiv.style.top = `${centerY + 80}px`;
        letterDiv.style.left = `${targetX}px`;
        letterDiv.classList.add("show");

        setTimeout(resolve, 800);
      });
    }

    async function deliverLetter(index) {
      const targetX = baseX + index * spacing;
      await moveTo(targetX - 50, centerY - 50);
      await leaveLetter(index);
      await moveTo(bearStartX, bearY);
    }

    async function startDelivery() {
      for (let i = 0; i < letras.length; i++) {
        if (letras[i] !== " ") {
          await deliverLetter(i);
        } else {
          continue;
        }
      }

      // Centrar osito
      bear.style.transition = "all 1s ease";
      bear.style.left = `${centerX - 50}px`;
      bear.style.top = `${centerY - 50}px`;

      // Mostrar mensaje final
      document.getElementById("finalMessage").classList.add("show");

      // Añadir luces parpadeantes
      addSparkles();

      // Lanzar cohete después de un momento
      setTimeout(() => {
        launchRocket();
      }, 1000);
    }

    function launchRocket() {
      const rocket = document.createElement('div');
      rocket.className = 'rocket';
      rocket.style.left = `${centerX}px`;
      rocket.style.bottom = `100px`;
      document.body.appendChild(rocket);

      // Mover cohete hacia arriba
      let duration = 1000;
      let startY = 100;
      let endY = window.innerHeight + 100;

      rocket.style.opacity = '1';
      rocket.style.transition = `transform ${duration}ms ease-out`;
      rocket.style.transform = `translateY(-${endY}px)`;

      // Explosión al finalizar el vuelo
      setTimeout(() => {
        explodeRocket(rocket);
        rocket.remove();
      }, duration);
    }

    function explodeRocket(rocket) {
      const x = parseFloat(rocket.style.left) || window.innerWidth / 2;
      const y = parseFloat(rocket.style.bottom) || window.innerHeight;

      for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'particle';
        heart.innerText = '❤️';

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;

        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        const fallDuration = Math.random() * 3 + 2;

        heart.style.left = `${x}px`;
        heart.style.top = `${window.innerHeight - y}px`;

        heart.style.transition = `transform ${fallDuration}s ease-out, opacity ${fallDuration}s ease-out`;
        heart.style.transform = `translate(${dx}px, ${dy}px) scale(${Math.random() * 0.5 + 0.5})`;
        heart.style.opacity = '0';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), fallDuration * 1000);
      }
    }

    function addSparkles() {
      for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * window.innerWidth}px`;
        sparkle.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(sparkle);
      }
    }

    window.addEventListener("load", () => {
      setTimeout(startDelivery, 1000);
    });
