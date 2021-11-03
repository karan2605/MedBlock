export const Center = ({ children, style }) => (
    <div style={style}>
      {children}
  
      <style jsx>{`
        div {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
      `}</style>
    </div>
  )