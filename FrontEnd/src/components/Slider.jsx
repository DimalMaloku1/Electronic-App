import ImageSlider from "../../src/components/ImageSlider";
const Slider = () => {
  const slides = [
    { url: "http://localhost:3000/img1.jpg", title: "foto1" },
    { url: "http://localhost:3000/img2.jpg", title: "foto2" },
    { url: "http://localhost:3000/img3.jpg", title: "foto3" },
    { url: "http://localhost:3000/img4.jpg", title: "foto4" },
    { url: "http://localhost:3000/img5.jpg", title: "foto5" },
  ];
  const containerStyles = {
    width: "1800px",
    height: "750px",
    margin: "0 auto",
  };
  return (
    <div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Slider;
