import {defineStore} from 'pinia'
import {ref} from "vue"

export const useSongIdStore=defineStore('songid',()=>{
	const ListIds=ref([])
	const nextId=ref('')
	const init_ids =(ids)=>{
		ListIds.value=ids
	}
	const next_change=(e)=>{
		for(let i=0;i<ListIds.value.length;i++){
			if(ListIds.value[i].id==e){
				 nextId.value=ListIds.value[i+1].id
			}
			
		}
	}
	return {
		ListIds,
		nextId,
		next_change,
		init_ids
	}
})