import { Injectable }       from "@angular/core";
import { BehaviorSubject }  from "rxjs";

@Injectable({providedIn: 'root'})
export class AlertService {

    private messages: string[] = [];
    private messageSubject = new BehaviorSubject<string[]>([]);

    getMessages() {
        return this.messageSubject.asObservable();
    }

    setMessage(message: string) {
        this.messages.push(message);
        this.messageSubject.next(this.messages);
    }
}
