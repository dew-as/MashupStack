// import logo from './logo.svg';
import './App.css';
import image from "./images/images.png"

function App() {
  let greetingStyle = { 'color': 'white' }
  let greeting = '"Welcome to MashupStack. I am Aswindev"'
  let doubleClickedStyle = true;
  let doubleClickedStyleColor;
  console.log(greeting);
  const data = [
    {
      id: 1,
      product: "Apple iPhone",
      price: 999,
      quantity: 2
    },
    {
      id: 2,
      product: "Samsung TV",
      price: 1299,
      quantity: 1
    },
    {
      id: 3,
      product: "Sony Headphones",
      price: 99,
      quantity: 3
    },
    {
      id: 4,
      product: "Dell Laptop",
      price: 799,
      quantity: 1
    },
    {
      id: 5,
      product: "Nintendo Switch",
      price: 399,
      quantity: 2
    }
  ]
  const fruits = ['banana', 'apple', 'orange', 'pineapple', 'rambutan']

  const fruitsList = []

  fruits.forEach((fruit) => fruitsList.push(<li style={{ listStyle: 'none' }} key={fruit}><b>{fruit}</b></li>))

  console.log(fruitsList);

  const images = [
    {
      "name": "Toy Car",
      "url": "https://m.media-amazon.com/images/I/81lroDEpXkL.jpg"
    },
    {
      "name": "Doll",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq7eyndRzBqqJaTdh-oFRP1hxf8iQD3afMBw&s"
    },
    {
      "name": "Lolipop",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoMpZx8MhuQ01chZRCxIlPadS57-k9Oneoow&s"
    },
    {
      "name": "Ice Cream",
      "url": "https://c.ndtvimg.com/2023-02/egi0l8i_ice-cream_625x300_17_February_23.jpg?im=FaceCrop,algorithm=dnn,width=384,height=384"
    }
  ]

  const logThis = () => {
    console.log('Hello I am a Log')
  }

  if (doubleClickedStyle) {
    doubleClickedStyleColor = { color: 'tomato' }
  } else {
    doubleClickedStyleColor = { color: 'dodgerblue' }
  }

  return (
    <div className="App">
      <h1 className='greetingStyleEx btn btn-dark mt-5' style={greetingStyle}>Hello {greeting}</h1>
      <img className="w-25" alt="image" src="https://joshcollinsworth.com/images/post_images/self-fulfilling-react.png" />
      <img alt="image" src={image} />
      <div>
        <h1>Examples</h1>
        <p>
          Due to the widespread use of tables across third-party widgets like calendars and date pickers, we’ve designed our tables to be opt-in. Just add the base class, then extend with custom styles or our various included modifier classes.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.product}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <h1 onDoubleClick={logThis} style={doubleClickedStyleColor}>Double Click For Color Change</h1>
      <p>{doubleClickedStyle.toString()}</p>
      <input type='text' value={data[0].product} />
      <ul>
        {fruitsList}
      </ul>
      <div className="container">
        <div className="row">
          {
            images.map(image => (
              <div key={image.name} className="col" >
                <img src={image.url} className="img-fluid img-thumbnail" alt="Image 1" />
                <h3 className="text-center">{image.name}</h3>
              </div>
            ))
          }
        </div>
      </div>


    </div >
  );
}

export default App;
