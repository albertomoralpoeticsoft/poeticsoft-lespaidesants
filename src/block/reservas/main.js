import immutableUpdate from 'immutable-update'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { 
  InspectorControls
} = wp.blockEditor
const {
	PanelBody,
	PanelRow
} = wp.components
const {
  useEffect,
  useReducer
} = wp.element

const edit = props => {

  const [state, dispatch] = useReducer(
    (state, action) => { 

      const newstate = immutableUpdate(
        state,
        action
      )      
      
      return newstate
    }, 
    {
      
    }
  )

  useEffect(() => {

  }, [])

  return <div className={`
    ${ props.className }
    Edit
  `}>
    <div className="Editor">  
      Editor
    </div>
    <InspectorControls>
      <PanelBody 
        title="Settings" 
        initialOpen={ true } 
        className="LespaiDeSants Reservas InspectorControls"
      >
        <PanelRow className="Controls">
          Controls
        </PanelRow>
      </PanelBody>
    </InspectorControls>
  </div>
}

registerBlockType(
  'lespaidesants/reservas',
  {
    title: __('Reservas'),
    icon: 'calendar-alt',
    category: 'lespaidesants',
    attributes: {
    }, 
    supports: {
      align: true
    },
    edit: edit
  }
)