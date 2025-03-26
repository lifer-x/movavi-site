let passwordView = document.querySelector("#password-view")
let passwordInput=document.querySelector("#password-input")
if (passwordView) {
    passwordView.addEventListener("click", ()=> {
        if (passwordInput.getAttribute("type") == "password"){passwordInput.setAttribute("type", "text")}
        else if (passwordInput.getAttribute("type") == "text"){ passwordInput.setAttribute("type", "password")}
})}2
class FormsValidation{
    errorMessages = {
        valueMissing:()=>"Please,fill this field",
        patternMismatch:({title})=>title ||"Data isn't correspond to pattern",
        tooShort:({minLength})=>`Entered text is too short, minimal length - ${minLength}`,
        tooLong:({maxLength})=>`Entered text is too short, maximal length - ${maxLength}`,
        typeMismatch:()=>"Type of text isn't correct1"
    }
    constructor(){
        this.bindEvents()

    }
    manageErrors(fieldElement,errorMessages){
        const fieldErrorsElement=fieldElement.parentElement.parentElement.querySelector(".field__errors")
        fieldErrorsElement.innerHTML=errorMessages.map((message)=>`<p>${message}</p>`).join("")
    }
    validateField(fieldElement){
        const errors=fieldElement.validity
        const errorMessages=[]
        Object.entries(this.errorMessages).forEach(([errorType,geterrorMessage])=>{
            if (errors[errorType]){
                errorMessages.push(geterrorMessage(fieldElement))
            }
        })
        this.manageErrors(fieldElement,errorMessages)
        const isValid =(errorMessages===0)
        fieldElement.ariaInvalid= !isValid
        return isValid
    }
    getFormData(element){
        const formData={}
        for (const formElement of element.elements){
            if (!formElement.name){
                continue
            }
            if (formElement.type==="checkbox"){
                formData[formElement.name]=formElement.checked
                continue
            }
            formData[formElement.name]=formElement.value


        }
        console.log(formData)
    }
    onBlur(event){
        const isFormField=event.target.closest("#regForm")
        const isRequired=event.target.required 
        if (isFormField && isRequired){
            this.validateField(event.target)
        }
    }
    onChange(event){
        const isRequired=event.target.required
        const isToggleType=["radio","checkbox"].includes(event.target.type)
        if (isToggleType && isRequired){
            this.validateField(event.target)
        }
    }
    onSubmit(event){
        const isFormElement=event.target.matches("#regForm")
        if (!isFormElement){
            return
        }
        const requiredElements=[...event.target.elements].filter((element)=>element.required)
        let isFormValid=true
        let firstInvalidField=null
        requiredElements.forEach((element)=>{
            const isFieldValid=this.validateField(element)
            if (!isFieldValid){
                isFormValid=false
                if (!firstInvalidField){
                    firstInvalidField=element
                }
            }
            if (!isFormValid){
                event.preventDefault()
                firstInvalidField.focus()
            }else if(isFormValid){
                this.getFormData(event.target)
            }
        })
    }
    bindEvents(){
        document.addEventListener("blur",(event)=>this.onBlur(event),true)
        document.addEventListener("change",(event)=>this.onChange(event))
        document.addEventListener("submit",(event)=>this.onSubmit(event))
    }
}

new FormsValidation()
