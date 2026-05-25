export const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#111524',
    color: '#ffffff',
    minHeight: '80vh',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box'
  },
  headerContainer: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '15px',
    marginBottom: '30px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#00d2ff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: 0,
    marginBottom: '10px',
    display: 'block'
  },
  title: {
    margin: 0,
    fontSize: '26px'
  },
  subtitle: {
    margin: '5px 0 0 0',
    color: '#8fa0dd',
    fontSize: '14px'
  },
  errorBanner: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  checkoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '30px',
    alignItems: 'start'
  },
  formLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  cardSection: {
    backgroundColor: '#1c243d',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#00d2ff'
  },
  fieldsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: '13px',
    fontWeight: '500'
  },
  inputElement: {
    padding: '12px 16px',
    backgroundColor: '#121829',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  formGridHalf: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  optionsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#121829',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'border 0.2s'
  },
  radioInput: {
    marginRight: '12px',
    width: '16px',
    height: '16px'
  },
  optionTextDetails: {
    fontSize: '12px',
    color: '#8fa0dd'
  },
  btnSubmit: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#00d2ff',
    color: '#111524',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 210, 255, 0.2)'
  },
  sidebar: {
    backgroundColor: '#1c243d',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '25px',
    position: 'sticky',
    top: '20px'
  },
  sidebarTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '10px'
  },
  summaryStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },
  summaryDescriptionValue: {
    textAlign: 'right',
    fontSize: '13px',
    maxWidth: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    margin: '10px 0'
  },
  totalPrice: {
    color: '#2ecc71',
    fontWeight: 'bold'
  },
  successContainer: {
    maxWidth: '500px',
    margin: '80px auto',
    padding: '40px 30px',
    backgroundColor: '#1c243d',
    borderRadius: '16px',
    border: '1px solid #2ecc71',
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'sans-serif',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  }
};