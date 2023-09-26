const CommissionPost = (props) => {

    return(
        <div className='backhome'>
            <nav>
                <Link to='/accounts'>BACK</Link>
                <Link to='/'>HOME</Link>
            </nav>
            <h1>Post Commission</h1>
            <div className='in'>
                <label>
                    Commission Title
                    <input type="text" placeholder='Commission Title' onChange={handleChange} name='comTitle'/>
                </label> 
                <br />
                <label>Deadline
                    <input type="date" placeholder='Deadline' onChange={handleChange} name='comDeadline'/>
                </label>
                <br />Location
                <input type="text" placeholder='Location' onChange={handleChange} name='comLocation'/>
                <br />
                <label htmlFor="">
                    Commission Type
                    <select name='comType' onChange={handleChange} value={commission.comType}>
                        <option value="">Choose type....</option>
                        <option value="HomeService - Indoor">Home Service - Indoor</option>
                        <option value="HomeService - Outdoor">Home Service - Outdoor</option>
                        <option value="Delivery">Delivery Service</option>
                        <option value="Transport">Transport Service</option>
                    </select>
                </label>
                <br />
                <textarea cols='20' rows='11' type="text" placeholder='Description' onChange={handleChange} name='comDescription'/>
                <br />
                <label>
                    Amount: ₱
                    <input type='number' placeholder='0.00' onChange={handleChange} name='comPay'/>
                </label>
                <input type="tel" placeholder='Contact Number' onChange={handleChange} name='Contactno'/>
                <br />
                <div className="map-post-wrap">
                 <div ref={mapContainer} className="map" />
                </div>
                <button onClick={handleAddMarkerClick}>Add Marker</button>
                <label>
                    <p>X: {commission.comLong}</p>
                </label>
                <label>
                    <p>Y: {commission.comLat}</p>
                </label>
                <button onClick={handleClick}>POST</button>
            </div>
        </div>
    );
}

export default CommissionPost;