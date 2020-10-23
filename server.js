const path = require('path')
const { request } = require('express')
const http = require('http')
const express = require('express')
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users.js');




const app = express();
const server = http.createServer(app);
const io = socketio(server)

//setting static
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Kanban Bot&nbsp;';

//run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room)

        //Welcoming user
        socket.emit('message', formatMessage(botName, 'Welcome To KanBan Chat!'));

        //Join broadcast to all users 
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // sending user/room info
        io.to(user.room). emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    });

    //Disconnection broadcast
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // sending user/room info
        io.to(user.room). emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
        }
        
    });

});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())





const projects = [
    {
        "project_id": '1',
        "text": "Chores",
        "lists": [
            {
                "list_id": '1',
                "title": "To Do",
                "tasks": [
                    {
                        "task_id": '1',
                        "text": "Cook dinner",
                        "status": 0,
                        "users": [{
                            "user_id": '1',
                            "name": 'Dev',
                            "image": '/public/images/dino1.png'
                        },
                        {
                            "user_id": '2',
                            "name": 'Ben',
                            "image": '/public/images/dino2.png'
                        }
                        ]
                    },
                    {
                        "task_id": '2',
                        "text": "Paint",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '3',
                        "text": "Eat",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '2',
                "title": "Doing",
                "tasks": [
                    {
                        "task_id": '4',
                        "text": "Sort out clothes",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '4',
                        "text": "washing",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '5',
                        "text": "washing up",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '3',
                "title": "Done",
                "tasks": [
                    {
                        "task_id": '6',
                        "text": "HW",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '7',
                        "text": "dancing",
                        "status": 0,
                        "users": []
                    }
                ]
            }
        ]
    },
    {
        "project_id": '2',
        "text": "DIY",
        "lists": [
            {
                "list_id": '4',
                "title": "To Do",
                "tasks": [
                    {
                        "task_id": '7',
                        "text": "Cook dinner",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '8',
                        "text": "Paint",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '9',
                        "text": "Eat",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '5',
                "title": "Doing",
                "tasks": [
                    {
                        "task_id": '10',
                        "text": "Sort out clothes",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '11',
                        "text": "washing",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '12',
                        "text": "washing up",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '6',
                "title": "Done",
                "tasks": [
                    {
                        "task_id": '13',
                        "text": "HW",
                        "status": 1,
                        "users": []
                    },
                    {
                        "task_id": '14',
                        "text": "dancing",
                        "status": 1,
                        "users": []
                    }
                ]
            }
        ]
    },
    {
        "project_id": '3',
        "text": "Lessons",
        "lists": [
            {
                "list_id": '7',
                "title": "To Do",
                "tasks": [
                    {
                        "task_id": '15',
                        "text": "Math",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '16',
                        "text": "English",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '17',
                        "text": "Science",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '8',
                "title": "Doing",
                "tasks": [
                    {
                        "task_id": '18',
                        "text": "English",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '19',
                        "text": "German",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '20',
                        "text": "Art",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '9',
                "title": "Done",
                "tasks": [
                    {
                        "task_id": '21',
                        "text": "Tech",
                        "status": 1,
                        "users": []
                    },
                    {
                        "task_id": '22',
                        "text": "Drama",
                        "status": 1,
                        "users": []
                    }
                ]
            }
        ]
    },
    {
        "project_id": '4',
        "text": "Happiness",
        "lists": [
            {
                "list_id": '10',
                "title": "To Do",
                "tasks": [
                    {
                        "task_id": '23',
                        "text": "Sleep",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '24',
                        "text": "Paint",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '25',
                        "text": "Eat",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '11',
                "title": "Doing",
                "tasks": [
                    {
                        "task_id": '26',
                        "text": "Yoga",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '27',
                        "text": "Run",
                        "status": 0,
                        "users": []
                    },
                    {
                        "task_id": '28',
                        "text": "Sewing",
                        "status": 0,
                        "users": []
                    }
                ]
            },
            {
                "list_id": '12',
                "title": "Done",
                "tasks": [
                    {
                        "task_id": '29',
                        "text": "Drawing",
                        "status": 1,
                        "users": []
                    },
                    {
                        "task_id": '30',
                        "text": "Baking",
                        "status": 1,
                        "users": []
                    }
                ]
            }
        ]
    },
]
const users = [
    {
        user_id: 1,
        name: 'Dev',
        image: '/images/dino3.png'
    },
    {
        user_id: 2,
        name: 'Ben',
        image: '/images/dino1.png'
    },
    {
        user_id: 3,
        name: 'Gemma',
        image: '/images/dino2.png'
    }
]


app.get('/comments', (req, res) => {
    res.send(comments)
})

app.get('/projects', (req, res) => {
    res.send(projects)
})

app.post('/projects', (req, res) => {
    projects.push(req.body)
    res.send()
})

app.get('/projects/:project_id/delete', (req, res) => {
    const index = projects.findIndex(project => {
        return project.project_id == req.params.project_id
    })
    projects.splice(index, 1)
    res.send()
})



app.post('/projects/:project_id/edit', async (req, res) => {
    console.log(req.body)
    const index = projects.findIndex(project => {
        return project.project_id == req.params.project_id
    })
    projects[index] = req.body
    res.redirect(`/`)
})

app.get('/projects/:project_id', (req, res) => {
    const project = projects.find(project => {
        return project.project_id == req.params.project_id
    })
    res.send(project)
})



app.post('/projects/:project_id/lists/:list_id/tasks', async (req, res) => {
    const project = projects.find(project => project.project_id === req.params.project_id)
    const list = project.lists.find(list => list.list_id === req.params.list_id)
    list.tasks.push(req.body)

    res.send()
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`app server running on port ${PORT}`)
})

app.listen(process.env.PORT, () => { })
