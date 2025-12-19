import {type ComponentProps, type KeyboardEvent, useState} from "react"
import {Input} from "@/common/components/ui/input/input"
import {Button} from "@/common/components/ui/button/button"
import {cn} from "@/common/utils/cn"

interface Props extends ComponentProps<"input"> {
	tags: string[]
	setTags: (tags: string[]) => void
}

export const InputTag = ({className, tags, setTags, ...rest}: Props) => {
	const [value, setValue] = useState("")

	const normalizedValue = value.trim()

	const isDuplicate = tags.some(
		tag => tag.toLowerCase() === normalizedValue.toLowerCase()
	)

	const handleAdd = () => {
		if (!normalizedValue || isDuplicate) return

		setTags([...tags, normalizedValue])
		setValue("")
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleAdd()
		}
	}

	const handleRemove = (tag: string) => {
		setTags(tags.filter(t => t !== tag))
	}

	return (
		<div className={cn("space-y-3", className)}>
			<div className="flex items-center gap-2">
				<Input
					{...rest}
					value={value}
					onChange={e => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<Button
					type="button"
					onClick={handleAdd}
					disabled={!normalizedValue || isDuplicate}
				>
					Add
				</Button>
			</div>

			<div className="flex flex-wrap gap-3">
				{tags.map(tag => (
					<span
						key={tag}
						className="flex items-center gap-1 rounded-full bg-muted  text-sm"
					>
            {tag}
						<Button
							variant="ghost"
							type="button"
							onClick={() => handleRemove(tag)}
							className="text-muted-foreground hover:text-foreground p-0"
						>
              ✕
            </Button>
          </span>
				))}
			</div>
		</div>
	)
}