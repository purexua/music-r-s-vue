import { createApp, h } from 'vue'
import Alert from '../components/Alert.vue'

export function useAlert() {
    let alertContainer: HTMLElement | null = null

    const createAlertContainer = () => {
        if (!alertContainer) {
            alertContainer = document.createElement('div')
            alertContainer.style.position = 'fixed'
            alertContainer.style.top = '0'
            alertContainer.style.left = '0'
            alertContainer.style.right = '0'
            alertContainer.style.zIndex = '9999999' // 使用非常高的 z-index 值
            document.body.appendChild(alertContainer)
        }
    }

    const showAlert = (options: {
        title: string,
        type?: 'info' | 'warning' | 'success' | 'error',
        closable?: boolean,
        duration?: number
    }) => {
        const { title, type = 'info', closable = true, duration = 3000 } = options

        createAlertContainer()

        const alertDiv = document.createElement('div')
        alertDiv.style.marginBottom = '10px'
        alertContainer!.insertBefore(alertDiv, alertContainer!.firstChild)

        const app = createApp({
            render() {
                return h(Alert, {
                    title,
                    type,
                    closable,
                    onClose: () => {
                        app.unmount()
                        alertContainer!.removeChild(alertDiv)
                        if (alertContainer!.childNodes.length === 0) {
                            document.body.removeChild(alertContainer!)
                            alertContainer = null
                        }
                    }
                })
            }
        })

        app.mount(alertDiv)

        if (duration > 0) {
            setTimeout(() => {
                app.unmount()
                alertContainer!.removeChild(alertDiv)
                if (alertContainer!.childNodes.length === 0) {
                    document.body.removeChild(alertContainer!)
                    alertContainer = null
                }
            }, duration)
        }
    }

    return {
        showAlert
    }
}