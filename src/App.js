import './App.css';
import { useState } from 'react'
import sportCar from '../src/assets/sportCarCutted.jpg'
import Axios from 'axios'
import { colors, brands, Ferrari, Lamborghini, Porsche, Koeniqsegg, Pagani, Jaguar, AstonMartin } from './cars'

const App = () => {

  const [color, setColor] = useState("")
  const [year, setYear] = useState(null)
  const [price, setPrice] = useState(0)
  const [carList, setCarList] = useState([])
  const [newPrice, setNewPrice] = useState(0)
  const [showCars, setShowCars] = useState(false)
  const [carBrand, setCarBrand] = useState("")
  const [carModels, setCarModels] = useState([])
  const [isTouched, setIsTouched] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isDeleting, setisDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [carToDelete, setCarToDelete] = useState(null);
  const [carToUpdate, setCarToUpdate] = useState(null)
  const [carNameToDelete, setCarNameToDelete] = useState(null)
  const [carNameUpdate, setCarNameToUpdate] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [errorUpdating, setErrorupdating] = useState("")
  const [formIsValid, setFormIsValid] = useState(false)

  const currentYear = new Date().getFullYear();

  const addCar = () => {
    if (!carBrand || !carModels || !color || !year || !price) {
      setErrorMsg("All form fields are required!")
      return
    }
    if(year > currentYear){
      return
    }
    if(price < 0){
      return
    }
   
    setFormIsValid(true)

    Axios.post("http://localhost:3001/create", {
      brand: carBrand,
      model: carModels,
      color: color,
      year: year,
      price: price
    }).then(() => {
      setCarList([...carList, {
        brand: carBrand,
        model: carModels,
        color: color,
        year: year,
        price: price
      }])
      console.log("Success!!!")
      setIsAdding(true)
    })
    {
      setIsTouched(false)
      setColor("")
      setYear("")
      setPrice("")
      setCarBrand("")
    }
  }

  const getCars = () => {
    Axios.get("http://localhost:3001/cars").then(response => {
      setCarList(response.data)
      window.scrollTo({
        top: 400,
        behavior: "smooth"
      });
    })
    setShowCars(!showCars)
  }

  const getCarsByPrice = () => {
    Axios.get("http://localhost:3001/cars").then(response => {
      setCarList(response.data.sort((a, b) => a.price - b.price))
    })
  }

  const getCarsByColor = () => {
    Axios.get("http://localhost:3001/cars").then(response => {
      setCarList(response.data.sort((a, b) => a.color > b.color ? 1 : -1))
    })
  }

  const getCarsByYear = () => {
    Axios.get("http://localhost:3001/cars").then(response => {
      setCarList(response.data.sort((a, b) => a.year - b.year))
    })
  }

  const update = (id) => {
    if (newPrice === 0 || newPrice === "") {
      setErrorupdating("No value inserted!")
      return
    }

    setErrorupdating("")
    Axios.put("http://localhost:3001/update", { price: newPrice, id: id }).then(response => {
      setCarList(carList.map(car => {
        if (car.id === id) {
          return {
            id: car.id,
            brand: car.brand,
            model: car.model,
            color: car.color,
            year: car.year,
            price: newPrice
          }
        } else {
          return car
        }
      }))
    })
  }

  const deleteCar = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(response => {
      setCarList(carList.filter(car => car.id !== id))
      console.log("car name", response);
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const resetForm = () => {
    let inputs = document.querySelectorAll("table input")
    inputs.forEach((input) => { input.value = '' });
  }

  

  return (
    <div className="App">
      <div className="titleAndHeader">
        <img src={sportCar} alt="" />
        <h1>Sport Cars Manager</h1>
        <img className="flippedImg" src={sportCar} alt="" />
      </div>
      <div className="information">
        <div className="inputAndlabel" style={{ marginTop: "50px" }}>
          <label>Brand</label>
          <select value={carBrand} onChange={ev => setCarBrand(ev.target.value)} >
            <option value=""></option>
            {brands.map(car => {
              return <option key={car}>{car}</option>
            })}
          </select>
        </div>
        <div className="modelChossingError">
          {!carBrand && isTouched && "Please choose a car brand first"}
        </div>
        <div className="inputAndlabel">
          <label>Model</label>
          <select onClick={() => setIsTouched(true)} onChange={ev => {
            setCarModels(ev.target.value)
          }}>
            <option selected value=""></option>
            {carBrand === "Lamborghini" ?
              Lamborghini.map(model => {
                return <option key={model}>{model}</option>
              }) : carBrand === "Ferrari" ?
                Ferrari.map(model => {
                  return <option key={model}>{model}</option>
                }) : carBrand === "Porsche" ?
                  Porsche.map(model => {
                    return <option key={model}>{model}</option>
                  }) : carBrand === "Koeniqsegg" ?
                    Koeniqsegg.map(model => {
                      return <option key={model}>{model}</option>
                    }) : carBrand === "Pagani" ?
                      Pagani.map(model => {
                        return <option key={model}>{model}</option>
                      }) : carBrand === "Aston Martin" ?
                        AstonMartin.map(model => {
                          return <option key={model}>{model}</option>
                        }) : carBrand === "Jaguar" ?
                          Jaguar.map(model => {
                            return <option key={model}>{model}</option>
                          }) : ""}
          </select>
        </div>
        <div className="inputAndlabel">
          <label>Color</label>
          <select value={color} onChange={(ev) => setColor(ev.target.value)}>
            <option selected value=""></option>
            {colors.map(color => {
              return <option style={{ color: `${color}` }} key={color}>{color}</option>
            })}
          </select>
        </div>
        <div className="inputAndlabel">
          <label>Year </label>
          <input value={year} type="number" onChange={(ev) => setYear(ev.target.value)} 
            min="1900" max="2021"/>
        </div>
        <div className="inputAndlabel">
          <label>Price  </label>
          <input value={price} type="number" onChange={(ev) => setPrice(ev.target.value)} 
           min="0" />
        </div>
        <div className="panelActionBtns">
          <button className="showCarsBtn" onClick={getCars}>{showCars ? "Close Garage" : "Open Garage"}</button>
          <button className="addCarsBtn" onClick={addCar}>Add Car</button>
        </div>
        <p className="errorMsg">{errorMsg}</p>
      </div>
      {showCars && <div className="sortingContainer">
        <button className="sortByPriceButton" onClick={() => getCarsByPrice()}>Sort by Price</button>
        <button className="sortByColorButton" onClick={() => getCarsByColor()}>Sort by Color</button>
        <button className="sortByYearButton" onClick={() => getCarsByYear()}>Sort by Year</button>
      </div>}
      {showCars && <input className="filterInput" type="text"
        placeholder="Search car brand for the today's mood."
        onChange={ev => setSearchTerm(ev.target.value)} />}

      {/* ============================== T A B L E  =============================== */}
      <table >
        {showCars && <tbody>
          <th><div>Brand</div></th>
          <th><div>Model</div></th>
          <th><div>Color</div></th>
          <th><div>Year</div></th>
          <th><div>Price</div></th>
          <th className="newpriceHead"><div>New Price</div></th>
          <th><div>Sell</div></th>
        </tbody>}
        {showCars && carList.filter(val => {
          if (searchTerm === "") {
            return val
          } else {
            val = val.brand.toLowerCase().includes(searchTerm.toLowerCase())
            return val
          }
        })
          .map(car => <tbody key={car.id}>
            <td>{car.brand}</td><td>{car.model}</td><td style={{
              color: `${car.color}`
            }}>{car.color}</td><td>{car.year}</td><td>{car.price}</td>
            <td className="updateTd">
              <input type="text" className="newPriceInput" placeholder="new price here"
                onChange={(ev) => setNewPrice(ev.target.value)} />
              <button onClick={() => {
                setIsUpdating(true)
                scrollToTop()
                setCarNameToUpdate(car.brand)
                update(car.id)
                setCarToUpdate(car.id)
              }}>Update</button>
            </td>
            <td>
              <button className="delBtn" onClick={() => {
                scrollToTop()
                setisDeleting(true)
                setCarToDelete(car.id)
                setCarNameToDelete(car.brand)
              }}>Delete</button>
            </td>
            <div>
            </div>
          </tbody>)}
      </table>
      {showCars && <div className="scrollUpWrapper">
        <button onClick={() => scrollToTop()} className="scrollUp">up</button>
      </div>}
      {isDeleting && <div className="deleteModal">
        <h3 className="modelDialog">Are you sure you ant to sell  this beautiful {carNameToDelete}?</h3>
        <div className="dialogActions">
          <button className="cancelDialog" onClick={() => {
            setisDeleting(false)
          }}>Cancel</button>
          <button className="yesDialog" onClick={() => {
            deleteCar(carToDelete)
            setCarToDelete(null)
            setisDeleting(false)
          }}>Yes</button>
        </div>
      </div>}
      {isUpdating && <div className="updateModal">
        <h3 className="modelDialog">{!errorUpdating ? `That ${carNameUpdate}  price was updated` : `${errorUpdating}`}</h3>
        <div className="dialogActions">
          <button className="okDialog" onClick={() => {
            setIsUpdating(false)
            setNewPrice("")
            resetForm()
          }}>OK</button>
        </div>
      </div>}
      {isAdding && <div className="addModal">
        <h3 className="modelDialog">New car added to your garage!!</h3>
        <div className="dialogActions">
          <button className="okDialog" onClick={() => {
            setIsAdding(false)
          }}>OK</button>
        </div>
      </div>}
    </div>
  );
}

export default App;
