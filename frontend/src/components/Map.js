import { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import RestList from './showList'
import LocationInfo from './LocationInfoBox'
import UserLocationIcon from './icon/userLocationIcon'

const Map = ({ center, zoom }) => {
	const [eventData, setEventData] = useState([])
	const [activeMarker, setActiveMarker] = useState('')
	const [boxInfo, setBoxInfo] = useState({
		restaurantsName: '',
		address: '',
	})
	const [open, setOpen] = useState(false)
	const [userLocationCoordinates, setUserLocationCoordinates] = useState({
		lat: null,
		lng: null,
	})

	useEffect(() => {
		const fetchEvents = async () => {
			const res = await fetch('http://localhost:5000/restaurants')
			const data = await res.json()

			setEventData(data.result)

			//get current location coordinates
			navigator.geolocation.watchPosition(res => console.log(res))
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log({ position })
				setUserLocationCoordinates({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})
			})
		}

		fetchEvents()
	}, [])

	const markers = eventData.map((ev, index) => {
		return (
			<LocationMarker
				key={index}
				lat={ev.lat}
				lng={ev.log}
				active={activeMarker === ev.restaurantsName}
				onClick={() => {
					setBoxInfo({
						restaurantsName: ev.restaurantsName,
						address: ev.address,
					})
					setOpen(true)
				}}
			/>
		)
	})

	return (
		<>
			<LocationInfo
				restaurantsName={boxInfo.restaurantsName}
				address={boxInfo.address}
				open={open}
				setOpen={setOpen}
			/>
			<RestList
				activeMarker={activeMarker}
				setActiveMarker={setActiveMarker}
				restaurants={eventData}
			/>
			<div className='map'>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyB1O-waPrUNTc8qiA7ST04pISY3SRlHxSg',
						v: '3.31',
					}}
					defaultCenter={center}
					defaultZoom={zoom}>
					{markers}
					{userLocationCoordinates.lat && (
						<UserLocationIcon
							lat={userLocationCoordinates.lat}
							lng={userLocationCoordinates.lng}
						/>
					)}
				</GoogleMapReact>
			</div>
		</>
	)
}

Map.defaultProps = {
	center: {
		lat: 25.2580303670708,
		lng: 55.29922439121271,
	},
	zoom: 15,
}

export default Map
