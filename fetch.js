async function fetchData(data) {
    try{
        let response = await fetch('https://strrt-trexcozor.webflow.io/',{
            method: "POST",
        },
        {body: JSON.stringify({data})}
    )
    let data_ = await response.json();
    console.log(data_);
    }catch(err){
        console.log(err);
    }
}
fetchData("www.g00gle.com");