import tools from '/data/tools'

const ToolGrid = ({ filter }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {tools
        .filter((x) => x.category.includes(filter))
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
        .map((tool, index) => (
          <div key={index} className="bg-cardGb">
            {tool.name}
          </div>
        ))}
    </div>
  )
}

export default ToolGrid
