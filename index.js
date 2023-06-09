const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite {
    constructor({ position, velocity, offset, color = 'red' }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50

        }
        this.color = color
        this.isAttacking
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)



        // attack box 
        // if (this.Attacking)
        if (this.isAttacking) {
            c.fillStyle = 'blue';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x

        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else
            this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

}
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    }
})


const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'white',
    offset: {
        x: -50,
        y: 0
    }
});



console.log(player)


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= enemy.position.x && rectangle1.attackBox.position.x <= enemy.position.x + enemy.width &&
        rectangle2.attackBox.position.y + rectangle2.attackBox.height >= enemy.position.y && rectangle2.attackBox.position.y <= enemy.position.y + enemy.height);
}
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    enemy.update()


    player.velocity.x = 0
    enemy.velocity.x = 0
    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    // enemy movement 
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }


    // detect player collision. This is for attacks. 
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking) {
        player.isAttacking = false
        document.querySelector('#enemyHealth').style.width = '20%';
    }
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking) {
        enemy.isAttacking = false
        console.log('enemy attack sucessfull');
    }


}



animate()
// Here I used event listeners for the actual player input and interaction. 
// Notice that I have one section for keydown for when the key is pressed down. 
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'

            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            break
    }
    console.log(event.key);

})
// Here is for what happens when the key is let go off or no longer pressed. If this has not been stated, the coded action will just continue forever even after the key has been unpressed. 
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.a.pressed = false
            break
    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.a.pressed = false
            break
    }


    console.log(event.key);

})

let startBtn = document.getElementById("start-btn")
let count = 0

function increment() {
    count = count + 1
    startBtn.innerText = count
}
