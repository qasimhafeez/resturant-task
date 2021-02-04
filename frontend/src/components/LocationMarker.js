import LocationIcon from './icon/locationIcon'

const LocationMarker = ({ lat, lng, onClick, active }) => {
	return (
		<div className={active && 'active-marker'} onClick={onClick}>
			<LocationIcon />
		</div>
	)
}
export default LocationMarker
