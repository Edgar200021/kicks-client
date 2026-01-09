import {ArrowUp} from "lucide-react";
import type {AdminProductSku as TAdminProductSku} from "@/common/types/api.ts";
import {cn} from "@/common/utils/cn.ts";
import {
	AdminProductSkuActions
} from "@/features/admin/product/components/admin-product-sku-actions.tsx";
import {AppLink} from "@/common/components/ui/link/link.tsx";
import {paths} from "@/config/paths.ts";

interface Props {
	className?: string;
	productSku: TAdminProductSku;
}

export const AdminProductSku = ({className, productSku}: Props) => {
	return (
		<div
			className={cn(
				"max-w-[400px] w-full bg-fa-white rounded-2xl p-4 flex flex-col gap-y-3 relative",
				className,
			)}
		>
			<AppLink
				to={paths.admin.products.skuDetail}
				params={{
					id: productSku.id
				}}
				className="absolute top-0 left-0 w-full h-full"
			/>
			<div className="flex justify-between gap-x-5 items-start">
				<div className="flex gap-x-4">
					<img
						src={productSku.images[0].imageUrl}
						alt={productSku.product.title}
						className="w-[84px] h-[84px] object-cover pt-4"
					/>
					<div className="flex flex-col gap-y-4">
						<div className="flex flex-col gap-y-0.5 font-semibold">
							<span>{productSku.product.title}</span>
							{productSku.product.category && (
								<span className="text-black/60">
									{productSku.product.category.name}
								</span>
							)}
						</div>
						<span>
							{productSku.salePrice != null ? (
								<>
									<span className="line-through text-black/60">
										${productSku.price}
									</span>
									<span className="text-red-500">${productSku.salePrice}</span>
								</>
							) : (
								<>${productSku.price}</>
							)}
						</span>
					</div>
				</div>
				<AdminProductSkuActions
					className="z-10"
					adminProductSku={productSku}
				/>
			</div>
			<div className="flex flex-col gap-y-4">
				<span className="font-semibold">Summary</span>
				<p className="text-sm text-primary-150/60 max-w-[320px]">
					{productSku.product.description}
				</p>
			</div>
			<div className="p-4 rounded-xl border-[0.75px] border-[#2323214D] flex flex-col gap-y-2 font-semibold text-sm text-primary-150/80">
				<div className="pb-2 border-b-[0.50px] border-b-primary-150/40 flex items-center justify-between gap-x-4">
					<span>Sales</span>
					<span className="flex items-center gap-x-1">
						<ArrowUp
							className="text-yellow"
							size={20}
						/>
						{/*TODO!*/}
						<span>{productSku.quantity}</span>
					</span>
				</div>

				<div className="flex items-center justify-between gap-x-4">
					<span> Remaining Products</span>
					<span>{productSku.quantity}</span>
				</div>
			</div>
		</div>
	);
};