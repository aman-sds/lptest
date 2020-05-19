export default (url, body = {}) =>
   new Promise(resolve => {
      fetch(`http://localhost:9001/${url}`, {
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
         },
         method: "POST",
         body: JSON.stringify(body)
      })
         .then(res => res.json())
         .then(json => resolve(json));
   });
