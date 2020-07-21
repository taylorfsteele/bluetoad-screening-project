import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./App.css";

function App() {
	const { register, handleSubmit } = useForm();
	const [images, setImages] = useState([]);
	const onSubmit = async (data) => {
		const apiKey = process.env.REACT_APP_APIKey;
		try {
			const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${data.search}&safe_search=1&per_page=25&page=1&format=json&nojsoncallback=1`;
			const response = await fetch(url, {
				method: "GET",
			});
			const jsonResponse = await response.json();
			const photoList = jsonResponse.photos.photo;
			setImages(photoList);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div
				style={{ position: "fixed", top: 0, width: "100%", zIndex: 1, backgroundColor: "white" }}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					style={{ width: "auto", padding: 30, textAlign: "center" }}
				>
					<TextField
						//Reference for useForm and field name
						inputRef={register({ required: true })}
						name="search"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Image Search"
						autoFocus
					/>
					<Button style={{ height: 50 }} type="submit" variant="contained" color="primary">
						Search
					</Button>
				</form>
			</div>

			<div style={{ marginTop: 200, position: "relative" }}>
				{!images.length && <h2>Search for some images!</h2>}
				{images.map((photo, i) => (
					<div style={{ paddingTop: 20, margin: "auto", width: "50%", textAlign: "center" }}>
						<img
							key={i}
							src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
							alt={photo.title}
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
