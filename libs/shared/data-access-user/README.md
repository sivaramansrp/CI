# data-access-user

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test data-access-user` to execute the unit tests.

## How to use the reusable component - formas-dinamicas

Path to the component "libs/shared/data-access-user/src/tramites/components/formas-dinamicas/"

Component Reference path: "apps/cofepris/src/app/application/tramites/261702/components/permisoDesistir.component.ts"

JSON Reference Path: "apps/cofepris/src/app/application/tramites/261702/constantes/retiros-cofepris.enum.ts"

Step 1: Populate the @Input  properties (formularioTitulo, forma, formularioDatos, and state) in the parent component.

`formularioTitulo` =>  formTitle (optional)

`forma` => create a form and inside create an empty child formgroup and pass that formgroup to this reusable component

`formularioDatos` => create json as mentioned in the reference

`state` => store the state in the parent component and pass the state as input to this reusable component

STEP 2: Handle all the field related functionalities in the parent component(can refer the component as mentioned above)


