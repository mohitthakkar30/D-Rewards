import { GoPrimitiveDot } from 'react-icons/go'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import domtoimage from 'dom-to-image'
import { useRef, useState } from 'react'
import { updatePreviewUrl } from '../features/previewInfo'
interface Props {
	LeadName: string
	description: string
	memberArray: Array<any>
}

export const Preview = () => {
	const leadName = useAppSelector((state) => state.collabInfo.LeadName)
	const desc = useAppSelector((state) => state.collabInfo.Description)
	const memberArray = useAppSelector(
		(state) => state.FormReducers.MemberArray
	)
	const memberCount = useAppSelector(
		(state) => state.FormReducers.memberCount
	)
	const collabTitle = useAppSelector((state) => state.collabInfo.collabName)
	const dispatch = useAppDispatch()
	const node = useRef<HTMLDivElement>(null!)

	domtoimage
		.toPng(node.current)
		.then(function makeImage(dataUrl: any) {
			const img = new Image()
			dispatch(updatePreviewUrl(dataUrl))
			img.src = dataUrl
		})
		.catch(function (error: any) {
			console.error('oops, something went wrong!', error)
		})

	return (
		<>
			<div className='flex justify-center items-center pt-10'>
				<div
					ref={node}
					className='w-[35rem] h-[40rem] bgnft aspect-square rounded-3xl flex flex-col items-center'
				>
					{collabTitle != '' && (
						<>
							<h1 className='uppercase text-4xl py-5 text-black font-Lexend font-extrabold '>
								{collabTitle}
							</h1>
							<div className='w-3/4 h-0.5 bg-black'></div>
						</>
					)}
					<div className='max-w-md'>
						<p className='flex justify-center items-center text-center text-black font-outfit font-normal py-3'>
							{desc}
						</p>
						{leadName != '' && (
							<h1 className='flex justify-center font-extrabold text-black font-Lexend text-xl pt-3'>
								Lead- <span>{leadName}</span>
							</h1>
						)}
					</div>
					<div className='flex justify-start  w-full px-14'>
						<ul className='list-outside list-disc flex flex-col space-y-5 font-Outfit pt-5 '>
							{memberCount != 0 &&
								memberArray.map((props) => {
									const { name, role } = props
									return (
										<>
											<li className='flex justify-start items-start space-x-2'>
												<div className='pt-1 text-black '>
													<GoPrimitiveDot />
												</div>
												<div className='flex flex-col'>
													<span className='text-2xl text-black font-semibold '>
														{name}
													</span>
													<span className='text-md black-[#CFCFCF]'>
														{role}
													</span>
												</div>
											</li>
										</>
									)
								})}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
