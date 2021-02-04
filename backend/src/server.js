import express from 'express'
import { connnect } from './connection'
import cors from 'cors'

import { FestaurantsModel, restaurantsSchema } from './schema'
import { restaurants } from './data'

//create server
const app = express()

//middlewares
app.use(cors())

//api's

app.get('/saverestaurants', async (_, res) => {
	const result = await FestaurantsModel.create(restaurants)
	console.log({ result })
	res.send({ result })
})

app.get('/restaurants', async (_, res) => {
	try {
		const result = await FestaurantsModel.find().exec()
		res.send({ result })
	} catch (err) {
		res.end(err)
	}
})

const port = process.env.PORT || 5000
//server listening...

connnect
	.then(() => {
		app.listen(port, () =>
			console.log(`app is listensing on ${port} with connected mongodb`)
		)
	})
	.catch(err => console.log('having connection issues...', err))
