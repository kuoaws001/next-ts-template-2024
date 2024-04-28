import axios from "axios"
import { Actor } from '@/models/actor'

const page = async () => {

    const res = await axios.get('http://localhost:3000/api/actors');
    const actors: Actor[] = res.data;

    return (
        <div>
            <ul>
                {actors.map(actor => (
                    <li key={actor.actor_id}>{actor.first_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default page