import { useEffect, useState } from 'react'

const locationInfoBox = {
	backgroundColor: 'brown',
	padding: '1rem',
	// position: 'absolute',
	top: 0,
	right: 50,
	zIndex: 10,
	opacity: 0.7,
	minWidth: '200px',
	color: 'white',
	cursor: 'pointer',
	margin: '0 .6rem',
	// minWidth: 0,
}

const buttonStyle = {
	backgroundColor: 'brown',
	padding: '1rem',
	position: 'absolute',
	margin: '0 .6rem',
	top: '69%',
	left: 0,
	zIndex: 10,
	opacity: 0.7,
	cursor: 'pointer',
	color: 'white',
}

const horizontalScroller = {
	display: 'flex',
	overflowX: 'auto',
	position: 'absolute',
	top: '80%',
	zIndex: 10,
	width: '95%',
}

const RestList = ({ restaurants, setActiveMarker, activeMarker }) => {
	useEffect(() => {
		console.log({ restaurants })
	}, [restaurants])

	return (
		<div>
			{activeMarker && (
				<h2 style={buttonStyle} onClick={() => setActiveMarker('')}>
					Reset
				</h2>
			)}
			<div style={horizontalScroller} className='hideScroller'>
				{restaurants.map((item, i) => (
					<div
						style={locationInfoBox}
						key={i}
						onClick={() => setActiveMarker(item.restaurantsName)}>
						<h3>{item.restaurantsName}</h3>
						<p>{item.address}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default RestList
