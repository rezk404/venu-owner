import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBInput,
	MDBBtn,
	MDBRow,
} from 'mdbreact';
import {
	addStadiumHour,
	deleteStadiumHour,
	fetchStadiumData,
	fetchStadiumHours,
} from '../helpers/apiHelpers';
import { convertTo24HourFormat } from '../helpers/dataHelpers';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';

const StadiumHours = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedHour, setSelectedHour] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [cookies, setCookies] = useCookies(['access_token']);
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [fromPeriod, setFromPeriod] = useState('AM');
	const [toPeriod, setToPeriod] = useState('AM');
	const [events, setEvents] = useState([]);
	const [stadiumData, setStadiumData] = useState(null);
	useEffect(() => {
		fetchStadiumData(cookies.access_token).then((data) => {
			setStadiumData({ ...data });

			fetchStadiumHours(cookies.access_token, data.id).then(
				(hoursData) => {
					setEvents(
						hoursData.map((data) => {
							return {
								id: data.id,
								title: `${data.from} - ${data.to}`,
								start: new Date(
									`${data.day}T${convertTo24HourFormat(
										data.from
									)}`
								),
								end: new Date(
									`${data.day}T${convertTo24HourFormat(
										data.to
									)}`
								),
							};
						})
					);
				}
			);
		});
	}, []);
	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	const toggleDeleteModal = () => {
		setDeleteModalOpen(!deleteModalOpen);
	};
	const handleDateClick = (arg) => {
		setSelectedDate(arg.dateStr);
		toggleModal();
	};
	const handleEventClick = (arg) => {
		console.log(arg.event.id);
		setSelectedHour(arg.event.id);
		toggleDeleteModal();
	};
	const handleSave = async () => {
		const data = await addStadiumHour(cookies.access_token, {
			stadium_id: 1,
			day: selectedDate,
			from: `${from} ${fromPeriod}`,
			to: `${to} ${toPeriod}`,
			price: 0,
		});
		if (data.success) {
			toast.success('Successfully Added Hour');
			setSelectedDate(null);
			toggleModal();
			fetchStadiumHours(cookies.access_token, stadiumData.id).then(
				(hoursData) => {
					setEvents(
						hoursData.map((data) => {
							return {
								id: data.id,
								title: `${data.from} - ${data.to}`,
								start: new Date(
									`${data.day}T${convertTo24HourFormat(
										data.from
									)}`
								),
								end: new Date(
									`${data.day}T${convertTo24HourFormat(
										data.to
									)}`
								),
							};
						})
					);
				}
			);
			setTo('');
			setFrom('');
			setToPeriod('AM');
			setFromPeriod('AM');
		} else {
			toast.error(data.error);
		}
	};
	const handleDelete = async () => {
		const data = await deleteStadiumHour(
			cookies.access_token,
			selectedHour
		);
		if (data.success) {
			setDeleteModalOpen(false);
			toast.success('Hour Deleted Successfully');
			setEvents((prev) =>
				prev.filter((hourData) => hourData.id != selectedHour)
			);
			setSelectedHour(null);
		}
	};
	return (
		<div className="container-fluid">
			<h1 className="text-center mb-4 mt-5">Stadium Hours</h1>

			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={handleDateClick}
				events={events}
				eventClick={handleEventClick}
			/>

			<MDBContainer>
				<MDBModal isOpen={modalOpen} toggle={toggleModal}>
					<MDBModalHeader toggle={toggleModal}>
						Enter Stadium Hours
					</MDBModalHeader>
					<MDBModalBody>
						<div className="d-flex align-items-center mb-3">
							<div className="mr-2 d-flex flex-column align-items-center">
								<label htmlFor="from" className="form-label">
									From
								</label>
								<input
									type="text"
									className={`form-control ${
										from &&
										!/^((0?[1-9]|1[0-2]):[0-5][0-9])$/.test(
											from
										) &&
										'is-invalid'
									}`}
									id="from"
									name="from"
									value={from}
									pattern="^(0?[1-9]|1[0-2]):[0-5][0-9]$"
									placeholder="--:--"
									onChange={(e) => setFrom(e.target.value)}
								/>
								<select
									className="custom-select mt-3"
									value={fromPeriod}
									onChange={(e) =>
										setFromPeriod(e.target.value)
									}
								>
									<option value="AM">AM</option>
									<option value="PM">PM</option>
								</select>
							</div>
							<div className="mx-3">-</div>
							<div className="ml-2 d-flex flex-column align-items-center">
								<label htmlFor="to" className="form-label">
									To
								</label>
								<input
									type="text"
									className={`form-control ${
										to &&
										!/^((0?[1-9]|1[0-2]):[0-5][0-9])$/.test(
											to
										) &&
										'is-invalid'
									}`}
									id="to"
									name="to"
									value={to}
									pattern="^(0?[1-9]|1[0-2]):[0-5][0-9]$"
									placeholder="--:--"
									onChange={(e) => setTo(e.target.value)}
								/>

								<select
									className="custom-select mt-3"
									value={toPeriod}
									onChange={(e) =>
										setToPeriod(e.target.value)
									}
								>
									<option value="AM">AM</option>
									<option value="PM">PM</option>
								</select>
							</div>
						</div>
						<MDBRow className="px-2">
							<MDBBtn color="primary" onClick={handleSave}>
								Save
							</MDBBtn>
						</MDBRow>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>

			<MDBContainer>
				<MDBModal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
					<MDBModalHeader toggle={toggleDeleteModal}>
						Delete Hour
					</MDBModalHeader>
					<MDBModalBody>
						<MDBRow>
							<h5 className="text-center mb-3">
								Are you sure you want to delete this hour?
							</h5>
						</MDBRow>
						<div className="d-flex align-items-center justify-content-center mb-3 px-4">
							<MDBBtn
								color="success"
								className="col-6"
								onClick={handleDelete}
							>
								Yes
							</MDBBtn>
							<div className="mx-2"></div>
							<MDBBtn
								color="danger"
								className="col-6"
								onClick={toggleDeleteModal}
							>
								No
							</MDBBtn>
						</div>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		</div>
	);
};

export default StadiumHours;
