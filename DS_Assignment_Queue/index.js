class Employee {
    constructor(name = "", age = 0) {
      this.name = name;
      this.age = age;
    }
  }
  
  class Queue {
    collection = [];
    main_key = "";
    lastElementPulled = "";
    constructor(key) {
      this.main_key = key;
      let collection_temp = localStorage.getItem(key);
      this.collection = collection_temp != null ? JSON.parse(collection_temp) : [];
      this.lastElementPulled = localStorage.getItem("lastElement") != null || undefined ? JSON.parse(localStorage.getItem("lastElement")) : "";
      console.log(this.main_key);
    }
    Push(model) {
      this.collection.push(model);
      this.updateStore();
    }
    Pull() {
      this.lastElementPulled = this.collection.shift();
      localStorage.setItem("lastElement", JSON.stringify(this.lastElementPulled));
      this.updateStore();
    }
  
    get lastPush() {
      return this.collection[this.collection.length-1] ? this.collection[this.collection.length-1] : "---";
    }
    updateStore() {
      localStorage.setItem(this.main_key, JSON.stringify(this.collection));
    }
  
    get lastPulled() {
      return this.lastElementPulled ? this.lastElementPulled : "---";
    }
  }
  
  // all HTML elements
  let name = document.getElementById("name");
  let age = document.getElementById("age");
  let lastPushed = document.getElementById("lastPushed");
  let lastPulled = document.getElementById("lastPulled");
  let IsOutput = document.getElementById("IsOutput");


  // Creating a Queue to take care of List
  let empQueue = new Queue("queList");

  
  // initializing last Pushed and last POP
  CreateList();
  lastPulled.innerHTML = `Name ${
    empQueue.lastElementPulled.name ?? "---"
  } , Age ${empQueue.lastElementPulled.age ?? "---"}`;
  lastPushed.innerHTML = `Name ${empQueue.lastPush?.name ?? "---"} , Age  ${
    empQueue.lastPush?.age ?? "---"
  }`;
  
  // to Add elements in the list
  function addElement() {
      console.log( empQueue.collection.length)
    
      let employee = new Employee(name.value, age.value);
  
      empQueue.Push(employee);
      name.value = "";
      age.value = "";
      lastPushed.innerHTML = `Name ${empQueue.lastPush.name ?? "---"} , Age ${empQueue.lastPush.age ?? "---"}`;
      CreateList();
      console.log(empQueue.collection.length);
    
  }
  
  // to Delete From the List
  function deleteElement() {
  
    if (empQueue.collection.length > 0) {
      empQueue.Pull();
      lastPulled.innerHTML = `Name ${empQueue.lastElementPulled.name ?? "---"} , Age ${empQueue.lastElementPulled.age ?? "---"}`;
  
      CreateList();
    }
  }
  
  // to Create List
  function CreateList() {
    if (empQueue.collection.length) {
        IsOutput.textContent = "";
      empQueue.collection.forEach((item, index) => {
        IsOutput.innerHTML += ` <p> <span>${index + 1} => </span> Name : ${item.name} , Age : ${item.age} </p>`;});
    } else {
        IsOutput.textContent = "  No in list ";
    }
  }
  