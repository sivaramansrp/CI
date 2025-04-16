## How to use the Formbuilder reusable component - (formas-dinamicas)

Path to the component "libs/shared/data-access-user/src/tramites/components/formas-dinamicas/"

Component Reference path: "apps/cofepris/src/app/application/tramites/261702/components/permisoDesistir.component.ts"

JSON Reference Path: "apps/cofepris/src/app/application/tramites/261702/constantes/retiros-cofepris.enum.ts"

Step 1: Populate the @Input  properties (formularioTitulo, forma, formularioDatos, and state) in the parent component.

`formularioTitulo` =>  formTitle (optional)

`forma` => create a form and inside create an empty child formgroup and pass that formgroup to this reusable component

`formularioDatos` => create json as mentioned in the reference

`state` => store the state in the parent component and pass the state as input to this reusable component

STEP 2: Handle all the field related functionalities in the parent component(can refer the component as mentioned above)

## Handling Validations for Formbuilder component
1. Inbuilt validators - Validators like `required, minlength, maxlength and pattern` are implemented directly in the reusable component. Just required to pass the validators in the json.

2. Backend-driven validations - Use the setError function on the formcontrol to display the error messages returned from the backend in the parent component.

3. Custom validators - Define the custom validation functions in the parent component and use the setError function on the formcontrol to display the error messages returned from the backend in the parent component.

## Handling State Management

1. Have used `emitirCambioDeValor` output event for emitting the changed values of the form controls in the formbuilder component.

2. This event can be used to handle the state management (i.e) update the state in the store and query the store to fetch the state and pass the state to the formbuilder component such that this component will take care of the rest.

