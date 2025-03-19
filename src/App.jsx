import { useSelector, useDispatch } from 'react-redux'
import {
	add,
	del,
	edit,
	toggleStatus,
} from './store/reducers/table-user/tableSlice'
import { useState } from 'react'
import {
	Button,
	Modal,
	Box,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './App.css'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
}

export default function App() {
	const { data } = useSelector(state => state.todolist)
	const dispatch = useDispatch()

	const [modalOpen, setModalOpen] = useState(false)
	const [editModalOpen, setEditModalOpen] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		desc: '',
		email: '',
		phone: '',
		city: '',
		status: 'Active',
	})

	const [editData, setEditData] = useState({
		id: null,
		name: '',
		desc: '',
		email: '',
		phone: '',
		city: '',
		status: 'Active',
	})

	const handleAddUser = () => {
		const { name, desc, email, phone, city } = formData
		if (name && desc && email && phone && city) {
			dispatch(add(formData))
			setFormData({
				name: '',
				desc: '',
				email: '',
				phone: '',
				city: '',
				status: 'Active',
			})
			setModalOpen(false)
		}
	}

	const handleEditUser = () => {
		dispatch(
			edit({
				id: editData.id,
				newName: editData.name,
				newDesc: editData.desc,
				newEmail: editData.email,
				newPhone: editData.phone,
				newCity: editData.city,
				newStatus: editData.status,
			})
		)
		setEditModalOpen(false)
	}

	return (
		<div className='container'>
			<h2>Redux TodoList</h2>

			<Button
				variant='contained'
				className='user-actions'
				onClick={() => setModalOpen(true)}
			>
				Add User
			</Button>
			<div className='user-list'>
				{data.length > 0 ? (
					data.map(user => (
						<div key={user.id} className='user-item'>
							<div className='user-info'>
								<p>
									<strong>Name:</strong> {user.name}
								</p>
								<p>
									<strong>Description:</strong> {user.desc}
								</p>
								<p>
									<strong>Email:</strong> {user.email}
								</p>
								<p>
									<strong>Phone:</strong> {user.phone}
								</p>
								<p>
									<strong>City:</strong> {user.city}
								</p>
								<p>
									<strong>Status:</strong> {user.status}
								</p>
								<p>
									<strong>Done:</strong>
									<span style={{ color: user.done ? 'green' : 'red' }}>
										{user.done ? 'Done' : 'Not Done'}
									</span>
									<input
										type='checkbox'
										checked={user.done}
										onChange={() => dispatch(toggleStatus(user.id))}
									/>
								</p>
							</div>
							<div className='user-actions'>
								<Button
									size='small'
									onClick={() => dispatch(del(user.id))}
									color='error'
								>
									<DeleteIcon />
								</Button>
								<Button
									size='small'
									onClick={() => {
										setEditData({
											id: user.id,
											name: user.name,
											desc: user.desc,
											email: user.email,
											phone: user.phone,
											city: user.city,
											status: user.status,
										})
										setEditModalOpen(true)
									}}
								>
									<EditIcon />
								</Button>
							</div>
						</div>
					))
				) : (
					<p style={{ textAlign: 'center', color: 'gray' }}>
						No users found 🙁
					</p>
				)}
			</div>

			{/* Add User Modal */}
			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<Box sx={style}>
					<h3>Add User</h3>
					{['name', 'desc', 'email', 'phone', 'city'].map(field => (
						<TextField
							key={field}
							fullWidth
							margin='dense'
							label={field.charAt(0).toUpperCase() + field.slice(1)}
							value={formData[field]}
							onChange={e =>
								setFormData({ ...formData, [field]: e.target.value })
							}
						/>
					))}
					<FormControl fullWidth margin='dense'>
						<InputLabel>Status</InputLabel>
						<Select
							value={formData.status}
							label='Status'
							onChange={e =>
								setFormData({ ...formData, status: e.target.value })
							}
						>
							<MenuItem value='Active'>Active</MenuItem>
							<MenuItem value='Inactive'>Inactive</MenuItem>
						</Select>
					</FormControl>
					<Button
						fullWidth
						variant='contained'
						onClick={handleAddUser}
						sx={{ mt: 2 }}
					>
						Save
					</Button>
				</Box>
			</Modal>

			{/* Edit User Modal */}
			<Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
				<Box sx={style}>
					<h3>Edit User</h3>
					{['name', 'desc', 'email', 'phone', 'city'].map(field => (
						<TextField
							key={field}
							fullWidth
							margin='dense'
							label={field.charAt(0).toUpperCase() + field.slice(1)}
							value={editData[field]}
							onChange={e =>
								setEditData({ ...editData, [field]: e.target.value })
							}
						/>
					))}
					<FormControl fullWidth margin='dense'>
						<InputLabel>Status</InputLabel>
						<Select
							value={editData.status}
							label='Status'
							onChange={e =>
								setEditData({ ...editData, status: e.target.value })
							}
						>
							<MenuItem value='Active'>Active</MenuItem>
							<MenuItem value='Inactive'>Inactive</MenuItem>
						</Select>
					</FormControl>
					<Button
						fullWidth
						variant='contained'
						onClick={handleEditUser}
						sx={{ mt: 2 }}
					>
						Save Changes
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
