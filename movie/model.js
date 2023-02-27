import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "topSecret",
	database: "movie-db",
});

await connection.connect();

export async function getAll() {
	const queryCommand = "SELECT * FROM Movies";
	const [movies] = await connection.query(queryCommand);
	return movies;
}

async function insert(movie) {
	const queryCommand = "INSERT INTO Movies (title, year) VALUES(?, ?)";
	const [result] = await connection.query(queryCommand, [
		movie.title,
		movie.year,
	]);
	return { ...movie, id: result.id };
}

async function update(movie) {
	const queryCommand = "UPDATE Movies SET title = ? , year = ? WHERE id = ?";
	const [result] = await connection.query(queryCommand, [
		movie.title,
		movie.year,
		movie.id,
	]);
	return movie;
}

export async function get(id) {
	const query = "SELECT * from Movies WHERE id = ?";
	const [data] = await connection.query(query, [id]);
	return data.pop();
}
export async function remove(id) {
	const queryCommand = "DELETE FROM Movies WHERE id =?";
	await connection.query(queryCommand, [id]);
	return null;
}

export function save(movie) {
	if (!movie.id) {
		return insert(movie);
	} else {
		return update(movie);
	}
}

