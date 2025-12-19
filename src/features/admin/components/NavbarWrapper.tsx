import {useState} from 'react'
import {Drawer, DrawerContent, DrawerTrigger} from "@/common/components/ui/drawer/drawer.tsx";
import {Button} from "@/common/components/ui/button/button.tsx";
import {AdminNavbar} from "@/features/admin/components/admin-navbar.tsx";
import {cn} from "@/common/utils/cn.ts";

type Props = {
	className?: string
	drawerClassname?: string
}

export const NavbarWrapper = ({className, drawerClassname}: Props) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<AdminNavbar className={cn("hidden xl:block fixed top-0 left-0", className)} />
			<div className={cn("xl:hidden", drawerClassname)}>
				<Drawer open={open} onOpenChange={setOpen} direction="left">
					<DrawerTrigger asChild>
						<Button
							variant="ghost"
							className="relative w-4.5 h-3 p-0 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5  after:bg-black after:transition-all after:duration-300  data-[state=open]:before:top-1/2 data-[state=open]:before:rotate-45 data-[state=open]:after:top-1/2 data-[state=open]:after:-rotate-45 data-[state=open]:[&_span]:opacity-0
               "
						>
							<span className="h-0.5 w-full absolute bg-black top-[50%] -translate-y-1/2 tranition-opacity duration-300"></span>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="bg-fa-white">
						<AdminNavbar onClick={() => setOpen(false)} className="border-0 max-w-full" />
					</DrawerContent>
				</Drawer>
			</div>
		</>

	)
}