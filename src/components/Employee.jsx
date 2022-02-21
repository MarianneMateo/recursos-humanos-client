import React, { useState, useEffect } from "react";

const defaultImageSrc = "/img/user.png";
const defaultStatus = "Inactivo";
const initialFieldValues = {
	employeeID: 0,
	employeeName: "",
	department: "",
	identityCard: "",
	salary: "",
	status: defaultStatus,
	imageName: "",
	imageSrc: defaultImageSrc,
	imageFile: null,
};

export default function Employee(props) {
	const { addOrEdit, recordForEdit } = props;

	const [values, setValues] = useState(initialFieldValues);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (recordForEdit != null) setValues(recordForEdit);
	}, [recordForEdit]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const showPreview = (e) => {
		if (e.target.files && e.target.files[0]) {
			let imageFile = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (x) => {
				setValues({
					...values,
					imageFile,
					imageSrc: x.target.result,
				});
			};
			reader.readAsDataURL(imageFile);
		} else {
			setValues({
				...values,
				imageFile: null,
				imageSrc: defaultImageSrc,
			});
		}
	};

	const validate = () => {
		let temp = {};
		temp.employeeName = values.employeeName == "" ? false : true;
		temp.department = values.department == "" ? false : true;
		temp.identityCard = values.identityCard == "" ? false : true;
		temp.salary = values.salary == "" ? false : true;
		temp.status = values.status == "" ? false : true;
		temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
		setErrors(temp);
		return Object.values(temp).every((x) => x == true);
	};

	const resetForm = () => {
		setValues(initialFieldValues);
		document.getElementById("image-uploader").value = null;
		setErrors({});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			const formData = new FormData();
			formData.append("employeeID", values.employeeID);
			formData.append("employeeName", values.employeeName);
			formData.append("department", values.department);
			formData.append("identityCard", values.identityCard);
			formData.append("salary", values.salary);
			formData.append("status", values.status);
			formData.append("imageName", values.imageName);
			formData.append("imageFile", values.imageFile);
			addOrEdit(formData, resetForm);
		}
	};

	const applyErrorClass = (field) =>
		field in errors && errors[field] == false ? " invalid-field" : "";

	return (
		<>
			<div className="container text-center">
				<p className="lead">Empleado</p>
			</div>
			<form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
				<div className="card">
					<div className="card-body">
						<img src={values.imageSrc} className="card-img-top" />
						<div className="form-group">
							<input
								type="file"
								accept="image/*"
								className={"form-control-file" + applyErrorClass("imageSrc")}
								onChange={showPreview}
								id="image-uploader"
							/>
						</div>
						<div className="form-group">
							<input
								className={"form-control" + applyErrorClass("employeeName")}
								placeholder="Nombre Empleado"
								name="employeeName"
								value={values.employeeName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								className={"form-control" + applyErrorClass("department")}
								placeholder="Departamento"
								name="department"
								value={values.department}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								className={"form-control" + applyErrorClass("identityCard")}
								placeholder="Cedula"
								name="identityCard"
								value={values.identityCard}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								className={"form-control" + applyErrorClass("salary")}
								placeholder="Salario"
								name="salary"
								value={values.salary}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group text-center">
							<button type="submit" className="btn btn-light">
								Agregar
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
