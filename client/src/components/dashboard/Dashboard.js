import {useState} from "react";
import RenderList from "./RenderList";

function Dashboard() {
    const [houses, setHouses ] = useState ([
        {year:"1978", address:"Victoriei nr 54", architect:"Adrian", id:1 },
        {year:"1676", address:"Stefan Cel Mare nr 22", architect:"Irina", id:2 },
        {year:"1907", address:"Vasile Lascar nr 99", architect:"Sebastian", id:3 }
      ])
    
      const [derelict, setDerelict ] = useState ([
        {year:"1778", address:"Gazarului nr 14", architect:"Adrian", id:4 },
        {year:"1278", address:"Cutitul de Argint nr 51", architect:"Adrian", id:5 },
        {year:"1078", address:"Drumul Sarii nr 99", architect:"Adrian", id:6 },
      ])
    return (
        <div className="home">
            <div>
            <RenderList buildings={houses} />
            </div>
            <br/><hr/>
            <div>
            <RenderList buildings={derelict}/>
            </div>
        </div>
    );
}

export default Dashboard;