# CRM App

This CRM App is a full-featured lead and agent management system with dashboards, filtering, lead tracking, and reporting tools. Built using Node.js, Express, React, and JavaScript, it helps teams manage leads, monitor agent performance, and track sales efficiently.

---

## Demo Link

[Live Demo](https://anvayacrm.vercel.app/)  

---

## Quick Start

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev  
```

### Technologies
- NodeJS  
- JavaScript  
- React
- Express

## Demo Video
Watch this video [here](https://drive.google.com/file/d/1VDAu5rjALKIhl78CznsKBlkSytOYxDEw/view?usp=sharing) 👈

##  Features

**Dashboard**
- Displays a list of all Leads
- Quick Filters by staus New and Contacted

**Leads Listing**
- Leads list
- “Delete” Lead button 

**Lead Details**
- View full Lead information (Sales Agent,Lead Source, Lead Status, Priority)
- “Edit Recipe” to update title, ingredients, steps

**Reports**
- Leads Closed By Agents
- Leads By Status

### **GET	/api/leads**<br>	 
List all Leads<br>	 
Sample Response:<br>
```[{ _id, name, source,salesAgent, ... }, …]```

### **GET	api/leads/:leadId**<br>	 	
Get details for one Lead<br>		
Sample Response:<br>
```{ _id, name, source,salesAgent, ... }```

### **POST	/api/agents**<br> 	
Create a new Agents <br>	
Sample Response:<br>
```{ _id, name, email, ... }```

### **GET	/api/report/last-week**<br>  	
lastweek closed lead Report api<br> 	 
Sample Response:<br> 
```{ closedLeads }```

  ## Contact
For bugs or feature requests, please reach out to ankitpatel.web@gmail.com