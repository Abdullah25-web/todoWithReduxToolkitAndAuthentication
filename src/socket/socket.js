import io from "socket.io-client";
import { BASE_URL } from "../common/constanst";

const socket = io(BASE_URL);

export default socket;
