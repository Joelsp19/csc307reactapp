import express from "express";
import cors from "cors";
 

const app = express();
const port = 8000;



const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspiring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list']
        .filter( (user) => user['job'] === job); 
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
//helper function to generate a unique id
//assumes math.random will generate a "unique" id
//note that there are (1/26)^3 * (1/10)^3 combos
function generateUID(){
    //need 3 random letters then 3 random numbers
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    let uid = "";
    for (let i = 0; i < 3; i++){
        uid += alpha.charAt(Math.random() * alpha.length);
    }
    for (let j = 0; j< 3; j++){
        uid += num.charAt(Math.random() * num.length);
    }
    return uid;
}

const addUser = (user) => {
    user['id'] = generateUID();
    users['users_list'].push(user);
    return user;
}    

const deleteUser = (user) => {
    users['users_list'].splice(users['users_list'].indexOf(user));
    return user;
}


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//gets the user by name or by job
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let name_list = users['users_list'];
    let job_list = users['users_list'];

    if (name != undefined){
        name_list = findUserByName(name);
    }
    if (job != undefined){
        job_list = findUserByJob(job);
    }

    //joins the two lists together --> gives one list with same values in both
    let fin_list = name_list.filter((user) => job_list.includes(user)) 
    let fin_result = {users_list: fin_list}
    res.send(fin_result)

});

//adds the user
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    let result = addUser(userToAdd);
    if (result !== undefined){
        res.status(201).send(result)
    }else{
        res.status(400).send(result)
    }
});

//deletes the user
app.delete('/users/:id', (req,res) => {
    const idToDelete = req.params['id'];
    let result = findUserById(idToDelete);
    if (result === undefined){
        res.status(404).send('Resource not found.');
    } else {
        deleteUser(result)
        res.status(204).send()
    }
})

//gets the user by id
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      