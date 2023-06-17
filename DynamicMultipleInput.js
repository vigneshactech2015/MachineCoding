import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { useSelector } from "react-redux";
import {useState} from "react"

export default function MultiEdit(){
    const [formFields , setFormFields] = useState([{key:'',value:'',action:'',errors:{key:null,value:null,action:null}}])
    const configSearchData = useSelector((state)=>state.appconfig.configParams.data.search.projects)
    const [dropDownFields, setDropDownFields] = useState([{project:"",platform:"",config:"",build:"",environment:"",errors:{project:null,platform:null,config:null,build:null,environment:null}}])
    const[updates , setUpdates] = useState([])
  
    const formIsValid = () => {
      if (formFields.length === 1 && formFields[0].key!=="" && formFields[0].value!=="" && formFields[0].action!=="") {
        return true;
      }
  
      const someEmpty = formFields.some(
        (item,iz) => item.key === "" || item.value === "" || item[`action`] === ""
      );
  
      if (someEmpty) {
        formFields.map((item, index) => {
          const allPrev = [...formFields];
  
          if (formFields[index].key === "") {
            allPrev[index].errors.key = "Key is required";
          }
  
          if (formFields[index].value === "") {
            allPrev[index].errors.value = "Value is required";
          }
  
          if (formFields[index][`action`] === "") {
            allPrev[index].errors[`action`] = "Action is required";
          }
          setFormFields(allPrev);
        });
      }
  
     
      return !someEmpty;
    };
  
    const checkSameKeyName = () => {
      const allFields = [...formFields]
      for(let x=0;x<formFields.length;x++){
        for(let y=x+1;y<formFields.length;y++){
          if(formFields[x].key === formFields[y].key){
            allFields[y].errors.key = "Same key cannot perform multiple action"
          }
        }
        setFormFields(allFields)
      }
    }
    
    const DropDownIsValid = () => {
      if (dropDownFields.length === 1 && dropDownFields[0].project!=="" && dropDownFields[0].platform!=="" && dropDownFields[0].config!=="" && dropDownFields[0].build!=="" && dropDownFields[0].environment!=="") {
        return true;
      }
  
      const someEmpty = dropDownFields.some(
        (item) => item.project === "" || item.platform === "" || item.config === "" || item.build || item.environment
      );
  
      if (someEmpty) {
        dropDownFields.map((item, index) => {
          const allPrev = [...dropDownFields];
  
          if (dropDownFields[index].project === "") {
            allPrev[index].errors.project = "Project is required";
          }
  
          if (dropDownFields[index].platform === "") {
            allPrev[index].errors.platform = "Platform is required";
          }
  
          if (dropDownFields[index].config === "") {
            allPrev[index].errors.config = "Config is required";
          }
  
          if (dropDownFields[index].build === "") {
            allPrev[index].errors.build = "Build is required";
          }
  
          if (dropDownFields[index].environment === "") {
            allPrev[index].errors.environment = "Environment is required";
          }
          setDropDownFields(allPrev);
        });
      }
  
      return !someEmpty;
    };
  
    function handleChange(e,index,key){
      if(!key) key = e.target.name
  
      //e.preventDefault();
     // e.persist();
  
      setFormFields((prev) => {
        return prev.map((item, i) => {
          if (i !== index) {
            return item;
          }
  
          return {
            ...item,
            [key]:e.target.value,
  
            errors: {
              ...item.errors,
              [key]:
                e.target.value.length > 0
                  ? null
                  : [key] + " Is required",
            },
          };
        });
      });
     
      }
  
  
    function nextHandler(e){
      e.preventDefault();
      let formCondition = formIsValid() ;
      let dropDownCondition = DropDownIsValid();
      let samename = checkSameKeyName();
      if(formCondition && dropDownCondition && samename){
        let newFormFields = [...formFields]
        let updates = newFormFields.map((item,i)=>{
          return{
            action:item[`action`],
            key:item.key,
            value:item.value
          }
        })
  
        let filteredUpdates = updates.map((update)=>{
          if(update.action==="delete"){
            return{
              action:update.action,
              key:update.key
            }
          }else{
            return{
              action:update.action,
              key:update.key,
              value:update.value
            }
          }
        })
  
        console.log('>>>filteredUpdate',filteredUpdates)
        console.log('>>>configList',dropDownFields)
        setUpdates(...filteredUpdates)
      }
    }
  
    function addMoreFields(index){
      let data = {key:'',value:'',action:"",errors:{key:null,value:null,action:null}};
      setFormFields((prev)=>[...prev,data])
    }
  
    function addMoreDropDownFields(index){
      let data = dropDownFields[dropDownFields?.length-1 || 0];
      setDropDownFields((prev)=>[...prev,data])
    }
  
    function removeDropDownField(e,index){
      e.preventDefault();
      let data = [...dropDownFields];
      data.splice(index,1);
      setDropDownFields(data);
    }
  
  
    function removeField(e,index){
      e.preventDefault();
      let data = [...formFields];
      data.splice(index,1);
      setFormFields(data);
    }
  
    function onProjectChange(e,index){
  
      e.preventDefault();
      e.persist();
      if(dropDownFields[index]?.platform!==""){
        setDropDownFields((prev) => {
          return prev.map((item, i) => {
            if (i !== index) {
              return item;
            }
            return {
              ...item,
              [e.target.name]: e.target.value,
              platform:"",
              config:"",
              build:"",
              environment:"",
              errors: {
                ...item.errors,
                [e.target.name]:
                  e.target.value.length > 0
                    ? null
                    : [e.target.name] + " Is required",
              },
            };
          });
        });
      }
      else{
      setDropDownFields((prev) => {
        return prev.map((item, i) => {
          if (i !== index) {
            return item;
          }
  
          return {
            ...item,
            [e.target.name]: e.target.value,
            errors: {
              ...item.errors,
              [e.target.name]:
                e.target.value.length > 0
                  ? null
                  : [e.target.name] + " Is required",
            },
          };
        });
      });
    }
    }
  
   function onConfigChange(e,index){
    e.preventDefault();
    e.persist();
  
    if(dropDownFields[index]?.build!==""){
      setDropDownFields((prev) => {
        return prev.map((item, i) => {
          if (i !== index) {
            return item;
          }
          return {
            ...item,
            [e.target.name]: e.target.value,
            build:"",
            environment:"",
            errors: {
              ...item.errors,
              [e.target.name]:
                e.target.value.length > 0
                  ? null
                  : [e.target.name] + " Is required",
            },
          };
        });
      });
    }
    else{
    setDropDownFields((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
  
        return {
          ...item,
          [e.target.name]: e.target.value,
          errors: {
            ...item.errors,
            [e.target.name]:
              e.target.value.length > 0
                ? null
                : [e.target.name] + " Is required",
          },
        };
      });
    });
  }
   }
  
   function onPlatformChange(e,index){
      e.preventDefault();
      e.persist();
      if(dropDownFields[index]?.config!==""){
        setDropDownFields((prev) => {
          return prev.map((item, i) => {
            if (i !== index) {
              return item;
            }
            return {
              ...item,
              [e.target.name]: e.target.value,
              config:"",
              build:"",
              environment:"",
              errors: {
                ...item.errors,
                [e.target.name]:
                  e.target.value.length > 0
                    ? null
                    : [e.target.name] + " Is required",
              },
            };
          });
        });
      }
     else{
      setDropDownFields((prev) => {
        return prev.map((item, i) => {
          if (i !== index) {
            return item;
          }
  
          return {
            ...item,
            [e.target.name]: e.target.value,
            errors: {
              ...item.errors,
              [e.target.name]:
                e.target.value.length > 0
                  ? null
                  : [e.target.name] + " Is required",
            },
          };
        });
      });
    }
   }
  
   function onBuildChange(e,index){
    e.preventDefault();
    e.persist();
    if(dropDownFields[index]?.environment!==""){
      setDropDownFields((prev) => {
        return prev.map((item, i) => {
          if (i !== index) {
            return item;
          }
          return {
            ...item,
            [e.target.name]: e.target.value,
            environment:"",
            errors: {
              ...item.errors,
              [e.target.name]:
                e.target.value.length > 0
                  ? null
                  : [e.target.name] + " Is required",
            },
          };
        });
      });
    }
    
    else{
    setDropDownFields((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
  
        return {
          ...item,
          [e.target.name]: e.target.value,
          errors: {
            ...item.errors,
            [e.target.name]:
              e.target.value.length > 0
                ? null
                : [e.target.name] + " Is required",
          },
        };
      });
    });
  }
   }
  
   function onEnvChange(e,index){
    e.preventDefault();
    e.persist();
  
    setDropDownFields((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
  
        return {
          ...item,
          [e.target.name]: e.target.value,
          errors: {
            ...item.errors,
            [e.target.name]:
              e.target.value.length > 0
                ? null
                : [e.target.name] + " Is required",
          },
        };
      });
    });
   }
  
    return(
    <div className="appconfig_multiedit_container">
      <form onSubmit={nextHandler}>
          {formFields?.map((formfield,index)=>{
            return(
              <div key={index} className="appconfig_multiedit_formalign">
                <div className="appconfig_multiedit_alignvalidation">
                  <div>
                <input type="text" placeholder="Keyname" name="key" value={formfield.key} onChange={(e)=>handleChange(e,index)} className="appconfig_multiedit_textfield"/>
                <span className="appconfig_multiedit_colon">:</span>
                </div>
                {formfield.errors.key && (
                  <div className="appconfig_multiedit_validationtext">{formfield.errors.key}</div>
                )}
  
                </div>
               
                <div className="appconfig_multiedit_alignvalidation">
                <input type="text" placeholder="value" name="value" value={formfield.value} onChange={(e)=>handleChange(e,index)} className="appconfig_multiedit_textfield"/>
                {formfield.errors.value && (
                  <div className="appconfig_multiedit_validationtext">{formfield.errors.value}</div>
                )}
                </div>
                <div className="appconfig_multiedit_alignvalidation">
                <div className="appconfig_multiedit_alignradio">
  
                <input type="radio" className="appconfig_multiedit_radio" name={`action${index}`} id="add" checked={formfield[`action`]==="add_or_update"} value="add_or_update" onChange={(e)=>handleChange(e,index,`action`)}/><label htmlFor="add">Add or Edit</label>
                <input type="radio" className="appconfig_multiedit_radio" name={`action${index}`} id="delete" checked={formfield[`action`]==="delete"} value="delete" onChange={(e)=>handleChange(e,index,`action`)}/><label htmlFor="delete">Delete</label>
                </div>
                {formfield.errors[`action`] && (
                  <div className="appconfig_multiedit_validationtext">{formfield.errors[`action`]}</div>
                )}
                </div>
                <div className="appconfig_multiedit_dynamicbtn">
               {formFields.length === index+1 &&  <b className="appconfig_multiedit_addnewfields" onClick={()=>addMoreFields(index)}><AddRoundedIcon/></b> }&nbsp;&nbsp;
                <b onClick={(e)=>removeField(e,index)} className="appconfig_multiedit_addnewfields"><ClearRoundedIcon/></b>
                </div>
              </div>
            )
          })}<br/>
  
  
          {dropDownFields?.map((field,index)=>{
            return(<div className="appconfig_multiedit_dropdown_container">
  
            <div className="appconfig_multiedit_alignvalidation">
        <select onChange={(e)=>onProjectChange(e,index)} name="project" value={field?.project} label="Project" variant="outlined" className="appconfig_multiedit_dropdown">
        <option value="" disabled selected>Select Project</option>
             {Object.keys(configSearchData)?.map((option, index) => {
                          return <option key={index} >
                              {option}
                          </option>
                      })}
             </select>
             {field.errors.project && (
                  <div className="appconfig_multiedit_validationtext">{field.errors.project}</div>
                )}
                  </div>
  
                  <div className="appconfig_multiedit_alignvalidation">
             <select onChange={(e)=>onPlatformChange(e,index)} name="platform" value={field?.platform} label="Platform" variant="outlined" className="appconfig_multiedit_dropdown">
             <option value="" disabled selected>Select Platform</option>
             {field?.project.length>0 && Object.keys(configSearchData[field?.project])?.map((option, index) => {
                          return <option key={index} >
                              {option}
                          </option>
                      })}
             </select>
             {field.errors.platform && (
                  <div className="appconfig_multiedit_validationtext">{field.errors.platform}</div>
                )}
                      </div>
  
                      <div className="appconfig_multiedit_alignvalidation">
             <select onChange={(e)=>onConfigChange(e,index)} name="config" value={field?.config} label="Configs" variant="outlined" className="appconfig_multiedit_dropdown">
             <option value="" disabled selected>Select Config</option>
             {field?.project.length>0 && field?.platform.length>0 && Object.keys(configSearchData[field?.project][field?.platform])?.map((option, index) => {
                          return (<option key={index} >
                              {option}
                          </option>)
                      })}
             </select>
             {field.errors.config && (
                  <div className="appconfig_multiedit_validationtext">{field.errors.config}</div>
                )}
             </div>
  
             <div className="appconfig_multiedit_alignvalidation">
             <select onChange={(e)=>onBuildChange(e,index)} value={field?.build} label="Build" name="build" variant="outlined" className="appconfig_multiedit_dropdown">
             <option value="" disabled selected>Select Build</option>
             {field?.project?.length>0 && field?.platform?.length>0 && field?.config?.length>0 && Object.keys(configSearchData[field?.project][field?.platform][field?.config])?.map((option, index) => {
                          return <option key={index} >
                              {option}
                          </option>
                      })}
             </select>
             {field.errors.build && (
                  <div className="appconfig_multiedit_validationtext">{field.errors.build}</div>
                )}
              </div>
  
              <div className="appconfig_multiedit_alignvalidation">
             <select onChange={(e)=>onEnvChange(e,index)} value={field?.environment} name="environment" label="environment" variant="outlined" className="appconfig_multiedit_dropdown">
             <option value="" disabled selected>Select Environment</option>
             {field?.project?.length>0 && field?.platform?.length>0 && field?.config?.length>0 && field?.build?.length>0 && Object.values(configSearchData[field?.project][field.platform][field?.config][field?.build])?.map((option, index) => {
                          return <option key={index} >
                              {option}
                          </option>
                      })}
             </select>
             {field.errors.environment && (
                  <div className="appconfig_multiedit_validationtext">{field.errors.environment}</div>
                )}
             </div>
  
             <div className="appconfig_multiedit_dynamicbtn">
               {dropDownFields.length === index+1 &&  <b className="appconfig_multiedit_addnewfields" onClick={()=>addMoreDropDownFields(index)}><AddRoundedIcon/></b> }&nbsp;&nbsp;
                <b onClick={(e)=>removeDropDownField(e,index)}><ClearRoundedIcon/></b>
                </div>
  
            </div>)
          })}<br/><br/>
          <button id="appconfig_multiedit_nextbutton" type="submit" className="button" onSubmit={nextHandler}>Next</button>
      </form>
      
    </div>)
  }
