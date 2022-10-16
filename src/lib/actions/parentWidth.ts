export const parentWidth = <T extends HTMLElement = HTMLElement>(element: T, setWidth: (newWidth: number) => void) => {

    const onResize = () => {
        setWidth(element.parentElement?.offsetWidth || 0)
    }

    window.addEventListener('resize', onResize)
    onResize()

    return {
        destroy() {
            window.removeEventListener('resize', onResize)
        }
    }
}