let move_speed = 5, gravity = 0.4;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector(".message");
let score_title = document.querySelector('.score_title');

let game_state = "start";
img.style.display = 'none';
message.classList.add('messagestyle');

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && game_state !== 'play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = "block";
        bird.style.top = "40vh";
        game_state = "play";
        message.innerHTML = " ";
        score_title.innerHTML = "Score ";
        score_val.innerHTML = "0";
        message.classList.remove("messagestyle");
        Play();
    }
});

function Play() {
    function move() {
        if (game_state !== "play") return;

        let pipe_sprites = document.querySelectorAll('.pipe_sprite');
        pipe_sprites.forEach(element => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if (bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                    bird_props.left + bird_props.width > pipe_sprite_props.left &&
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    bird_props.top + bird_props.height > pipe_sprite_props.top) {
                    game_state = "end";
                    message.innerHTML = 'Game Over '.fontcolor('red') + '<br> press Enter to Restart';
                    message.classList.add('messagestyle');
                    img.style.display = "none";
                    return;
                } else {
                    if (pipe_sprite_props.right < bird_props.left &&
                        pipe_sprite_props.right + move_speed >= bird_props.left &&
                        element.increase_score === '1') {
                        score_val.innerHTML = +score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    let isMouseDown = false;

    function apply_gravity() {
        if (game_state !== "play") return;
        bird_dy = bird_dy + gravity;
    
        document.addEventListener('mousedown', () => {
            isMouseDown = true;
            img.src = 'bird-1.png';
            bird_dy = -7.6;
        });
    
        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            img.src = 'bird.png';
        });
    
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'end';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messagestyle');
            return;
        }
    
        if (isMouseDown) {
            bird_dy = -7.6;
        }
    
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 35;

    function create_pipe() {
        if (game_state !== "play") return;

        if (pipe_separation > 115) {
            pipe_separation = 0;
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = "1";

            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
