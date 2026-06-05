import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function Log(
  stack: string,
  level: string,
  packageName: string,
  message: string
) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}