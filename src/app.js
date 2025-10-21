// BACKEND

const express = require('express');
const knex = require('knex');
 
const app = express();
app.use(express.json());

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'cities.db'
    },
    useNullAsDefault: true
})

// Nota: req = request (lo que envía el cliente), res = response (lo que responde el servidor).

// Definimos una ruta GET en la URL /cities
app.get('/cities', async (req, res) => {
    
    const cities = await db('cities').select("*");

    res.status(200).json(cities);
});

// Definimos una ruta GET en la URL /cities/:city
app.get('/cities/:id', async (req, res) => {
    
    const id = req.params.id;
    //TODO Comprobar que la ciudad existe y devolver un 404 si no está.
    // TODO Añadir de filtrar por nombre de ciudad.

    const city = await db('cities').select('*').where({id: id}).first();

    res.status(200).json(city);
});

// Definimos una ruta POST en la URL /cities
app.post('/cities', async (req, res) => {
    
    // Extraemos los valores enviados en el cuerpo de la petición (JSON)
    const name = req.body.name; // Obtenemos el nombre de la ciudad.
    //TODO Comprobar que altitude y population son de tipo entero.
    const altitudeValue = req.body.altitude; // Obtenemos el valor de la altitud.
    const populationValue = req.body.population; // Obtenemos el valor de la población.
    const capital = req.body.capital; // Obtenemos el valor de la capital.

    // Guardamos la ciudad en el objeto "cities", usando el nombre como clave.
    // Ejemplo: cities["Madrid"] = { altitude: 667, population: 3223000 }
    const newCity = await db('cities').insert ({
        name: name,
        altitude: altitudeValue,
        population: populationValue,
        capital: capital
    });

    // Respondemos al cliente con un estado HTTP 201 (Created).
    // Esto significa que el recurso (la ciudad) se creó con éxito.
    res.status(201).json(newCity);
});

// Definimos una ruta PUT en la URL /cities/:city
app.put('/cities/:id', async (req, res) => {

    const id = req.params.city;
    //TODO Comprobar si existe la ciudad.
    
    // Datos de altitud y población que llegan desde el cuerpo.
    const name = req.body.name
    const altitudeValue = req.body.altitude; // Obtenemos el valor de la altitud.
    const populationValue = req.body.population; // Obtenemos el valor de la población.
    const capital = req.body.capital; // Obtenemos el valor de la capital.

    await db('cities').where({id: id}).update({
        name: name,
        altitude: altitudeValue,
        population: populationValue,
        capital: capital
    });

    res.status(204).end();
 
})
 
// Definimos una ruta DELETE en la URL /cities/:city
app.delete('/cities/:id', async (req, res) => {

    const id  = req.params.id;
    //TODO Comprobar que la ciudad existe.
    
    await db('cities').where({id: id}).del();

    res.status(204).end();

});
 
app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});