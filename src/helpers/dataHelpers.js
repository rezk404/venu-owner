const grassTypes = [
	{
		id: 0,
		name: 'Natural grass',
	},
	{
		id: 1,
		name: 'Artificial grass',
	},
];

const stadiumTypes = [
	{
		id: 0,
		name: 'Five',
	},
	{
		id: 1,
		name: 'Seven',
	},
	{
		id: 2,
		name: 'Eleven',
	},
];

function convertTo24HourFormat(timeString) {
	const [time, period] = timeString.split(' ');
	const [hour, minute] = time.split(':');

	let hour24 = parseInt(hour);

	if (period === 'PM' && hour !== '12') {
		hour24 += 12;
	} else if (period === 'AM' && hour === '12') {
		hour24 = 0;
	}

	return `${hour24.toString().padStart(2, '0')}:${minute}`;
}

export { grassTypes, stadiumTypes, convertTo24HourFormat };
