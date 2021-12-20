function makeid(length) {
    var result  = '';
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export const emptyobject = {
    id: `#`,
    status: 'draft',
    street_address: undefined,
    city: undefined,
    post_code: undefined,
    country: undefined,
    clients_name: 'undefined',
    clients_email: 'undefined',
    client_street_address: 'undefined',
    clients_city: 'undefined',
    clients_post_code: 0,
    clients_country: 'undefined',
    invoiceDate: new Date().toISOString().substring(0, 10),
    payments_terms: 'undefined',
    project_desc: 'undefined',
    total_value: 0,
    item_list: []}


const data = [{
    id: `#${makeid(6)}`,
    status: 'Paid',
    street_address: "Levi Eshkol 63",
    city: "Tel Aviv",
    post_code: 631632,
    country: "Israel",
    clients_name: "Tomer Bernstein",
    clients_email: "tomerbern93@email.com",
    client_street_address: "Zaritzki 4",
    clients_city: "Tel Aviv",
    clients_post_code: 636031,
    clients_country: "Israel",
    invoiceDate: new Date(2021, 7, 28).toISOString().substring(0, 10),
    payments_terms: "Direct",
    project_desc: 'Lorem ipsum dolor.',
    total_value: 37.5,
    item_list: [{name: "Ball", quantity: 1, price: 5, key: makeid(4)},
    {name: "Toy", quantity: 3, price: 3, key: makeid(4)},
    {name: "Dancing Hook", quantity: 1, price: 7.5, key: makeid(4)},
    {name: "Jumping Rope", quantity: 2, price: 8, key: makeid(4)}]},

    {
        id: `#${makeid(6)}`,
        status: 'Pending',
        street_address: "Levi Eshkol 63",
        city: "Tel Aviv",
        post_code: 631632,
        country: "Israel",
        clients_name: "Mika Bergman",
        clients_email: "mikabman91@bizns.com",
        client_street_address: "Jabotinsky 102",
        clients_city: "Ramat Gan",
        clients_post_code: 312532,
        clients_country: "Israel",
        invoiceDate: new Date(2021, 7, 26).toISOString().substring(0, 10),
        payments_terms: "Credit",
        project_desc: 'consectetur adipiscing elit.',
        total_value: 138,
        item_list: [{name: "Book", quantity: 2, price: 10, key: makeid(4)},
        {name: "Pen", quantity: 10, price: 1, key: makeid(4)},
        {name: "Notebook", quantity: 2, price: 4, key: makeid(4)},
        {name: "Ink", quantity: 1, price: 100, key: makeid(4)}]}

]

export default data;