

export const datesform = data => {

  let houroptions = '<option value="Todo">Todo el día</option>'
  for(let i=9; i<22; i++) {

    const hour = i.toString().padStart(2, 0)

    houroptions += `<option
      value="${ i }"
    >
      Desde ${ hour }:00
    </option>`
  }

  let durationoptions = '<option value="Todo">Cuantas horas?</option>'
  for(let i=1; i<12; i++) {

    durationoptions += `<option
      value="${ i }"
    >
      ${ i } hora/s
    </option>`
  }

  let durantenoptions = '<option value="No">Selecciona hasta cuando...</option>'
  for(let i=2; i<9; i++) {

    durantenoptions += `<option
      value="${ i }"
    >
      Durante ${ i } semanas
    </option>`
  }

  return `
    <form> 
      <div class="Fields">
        <div class="Field HourSelector">
          <select 
            id="selecthour"
            name="hour"
          > 
            ${ houroptions }
          </select> 
        </div>
        <div class="Field DurationSelector">
          <select 
            id="selectduration"
            name="duration" 
            disabled="disabled"
          > 
            ${ durationoptions }
          </select> 
        </div>
        <div class="Field Recurrent">
          <input 
            id="isrecurrent"
            type="checkbox" 
            name="recurrent"
          /> 
          <label for="recurrent">
            Quiero reservar este horario los ${ data.diasemana }
          </label>
        </div>
        <div class="Field Durante">
          <select 
            id="recurrentuntil"
            name="duranten"
            disabled="disabled"
          > 
            ${ durantenoptions }
          </select> 
        </div>
      </div>
      <div class="Actions">
        <input 
          id="reservarmas"
          type="submit" 
          value="Guardar y seleccionar más dias" 
        /> 
        <input 
          id="reservar"
          type="submit" 
          value="Reservar" 
        /> 
      </div>
    </form>
  `
}

export const savingform = data => {

  return `
    <form> 
      <div class="Message">
        Guardando...
    </form>
  `
}

export const confirmform = data => {

  return `
    <form> 
      <div class="Fields">
        <div class="Field Mail">
          <input 
            id="yourmail"
            type="email" 
            placeholder="Tu Email para confirmar"
          /> 
        </div>
      </div>
      <div class="Actions">
        <input 
          id="confirmreservation"
          type="submit" 
          value="Confirmar" 
        /> 
      </div>
    </form>
  `
}