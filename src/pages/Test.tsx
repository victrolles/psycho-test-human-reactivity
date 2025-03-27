import Shape from "../components/Shape";
import img_bois from "../assets/bois.png";
import img_star from "../assets/herbs.png";

function Test()  {
  return (
    <div className="test">
        <h1>Test de réactivité</h1>
        <Shape shape="rectangle" color="rgb(255, 0, 0)" />
        <Shape shape="heart" texture={img_bois} />
        <Shape shape="triangle" color="rgb(0, 255, 0)" />
        <Shape shape="circle" texture={img_star} />
    </div>
  );

};

export default Test;