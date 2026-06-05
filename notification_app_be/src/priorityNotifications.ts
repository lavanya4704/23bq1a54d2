import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
      }
    );

    const notifications = response.data.notifications;

    notifications.sort((a: any, b: any) => {
      const weightDifference =
        WEIGHTS[b.Type] - WEIGHTS[a.Type];

      if (weightDifference !== 0) {
        return weightDifference;
      }

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    });

    const top10 = notifications.slice(0, 10);

    console.log("\nTOP 10 PRIORITY NOTIFICATIONS\n");
    console.table(top10);

  } catch (error) {
    console.error(error);
  }
}

getTopNotifications();