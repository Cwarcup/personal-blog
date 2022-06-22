import tools from '/data/tools'
import ToolsCard from './ToolsCard'

const ToolGrid = ({ filter }) => {
  return (
    <div className="container mx-4">
      <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2">
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
            <ToolsCard {...tool} key={index.toString()} />
          ))}
      </div>
    </div>
  )
}

export default ToolGrid
