import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Forms = ({ values, touched, errors, status }) => {
	const [ form, setForm ] = useState([]);
	useEffect(
		() => {
			status && setForm((form) => [ ...form, status ]);
		},
		[ status ],
	);
	return (
		<div>
			<Form>
				<Field type='text' name='name' placeholder='Name' />
				{touched.name && errors.name && <p>{errors.name}</p>}

				<Field type='email' name='email' placeholder='Email' />
				{touched.email && errors.email && <p>{errors.email}</p>}
				<Field type='password' name='password' placeholder='Password' />
				{touched.password && errors.password && <p>{errors.password}</p>}

				<label>
					Terms of Service
					<Field type='checkbox' name='terms' checked={values.terms} />
				</label>
				<button type='submit'>Submit!</button>
			</Form>
			{form.map((forms) => (
				<ul key={forms.id}>
					<li>Name: {forms.name}</li>
					<li>Email: {forms.email}</li>
					<li>Password: {forms.password.length} Characters</li>
				</ul>
			))}
		</div>
	);
};
const FormikForm = withFormik({
	mapPropsToValues({ name, email, password, terms }) {
		return {
			name     : name || '',
			email    : email || '',
			password : password || '',
			terms    : terms || '',
		};
	},
	validationSchema : Yup.object().shape({
		name     : Yup.string().required('Name is required'),
		password : Yup.string().min(6).required('Minimum Password Length is 6 Characters'),
		email    : Yup.string().required('Email is required'),
	}),
	handleSubmit(values, { setStatus }) {
		axios
			.post(`https://reqres.in/api/users`, values)
			.then((res) => {
				setStatus(res.data);
			})
			.catch((err) => console.log(err.response));
	},
})(Forms);

export default FormikForm;
console.log('This is the HOC', FormikForm);
