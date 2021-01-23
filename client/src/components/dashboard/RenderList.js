const RenderList = (props) => {
    const houses= props.buildings;
    return ( 
        <div>
        {houses.map((house) => (
          <div key={house.id}>
            <h1> {house.address} </h1>
            <p> This house was designed in {house.year} by {house.architect} </p>
          </div>
        ))}
        </div>
    );
}
 
export default RenderList;